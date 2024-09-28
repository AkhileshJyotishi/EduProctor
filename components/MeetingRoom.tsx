'use client';
import { useEffect, useRef, useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  InputDeviceStatus,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import { useRolesContext } from '@/providers/RolesProvider';
import { async } from 'regenerator-runtime';
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MeetingRoom = ({enabled}:{enabled:InputDeviceStatus}) => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const client = useStreamVideoClient();
  // useEffect(() => {
  //   const y = (e:unknown) => {
  //     console.log("object")
  //     console.log(e)

  //   }
  //   client?.on("all", y)
  //   return client?.off("all", y)
  // }, [])
  
  useEffect(() => {
    
    if(enabled=='enabled'){
    const interval = setInterval(() => {
      const node = document?.getElementsByClassName("str-video__video str-video__video--mirror")?.[0]
      if (node) {
        console.log("Predicting, node: ", node)
        webcamRunning=true
          predictWebcam(node as HTMLVideoElement)
          clearInterval(interval)
      }
    }, 1000)
    //   console.log("Camera enabled")
    //   console.log(document.getElementsByClassName("str-video__video str-video__video--mirror")[0])
    return () => clearInterval(interval)  
  }
},[])
 
  // const [video, setVideo] = useState<HTMLVideoElement | undefined>(document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined);


  let faceLandmarker: FaceLandmarker;

  let runningMode: "IMAGE" | "VIDEO" = "IMAGE";
  let webcamRunning: Boolean = false;

  let lastVideoTime = -1;
  let results: any = undefined;
  const videoRef = useRef<HTMLDivElement>(null)


  const userId = "user_2donzIeq5NQ4XamLJV1rE2GeqXl";
  // let video = document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined;
  // let video = document.querySelector([data-user-id="${userId}"]) as HTMLVideoElement | undefined;


  // const Call=useCall()


  async function predictWebcam(video:HTMLVideoElement) {

  // let video = document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined

    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await faceLandmarker.setOptions({ runningMode: runningMode });
    }
    let startTimeMs = performance.now();
    // console.log(lastVideoTime, " ", video?.currentTime)
    if (lastVideoTime !== video?.currentTime) {
      lastVideoTime = video.currentTime;
      results = faceLandmarker.detectForVideo(video, startTimeMs);

    
      // console.log("yash@uber ",results["faceBlendshapes"][0])
      if(results["faceBlendshapes"][0]){
        const jawOpen = results["faceBlendshapes"][0]["categories"][25]["score"]
      console.log("yash@uber ",jawOpen)
      const eyeclose1 = results["faceBlendshapes"][0]["categories"][20]["score"]
  
      const eyeclose2 = results["faceBlendshapes"][0]["categories"][19]["score"]
  
      if(results["faceBlendshapes"][0]["categories"][11]["score"] > 0.80 && results["faceBlendshapes"][0]["categories"][12]["score"] > 0.80){
        
        toast.dismiss()
        toast.info("Please Focus . Please Dont See Up!!")
      } 
  
      if(jawOpen > 0.5){
        if(role=="Student"){
          toast.dismiss()
            toast.warning("Please Focus . Don't Yawn!!")
        }
      }

      }
    }


    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(()=>predictWebcam(video));
    }
  }
 

  // useEffect(() => {
  //   console.log(video)
  //   if (video) {

  //     const constraints = { video: true };
  //     console.log("ma ", video)

  //     navigator.mediaDevices.getUserMedia(constraints)
  //       .then((stream) => {
  //         if (video) {
  //           console.log("umesh sir ")
  //           video.srcObject = stream;
  //           video.addEventListener("loadeddata", () => {
  //             webcamRunning = true
  //             predictWebcam()
  //           });

  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error accessing webcam:', error);
  //       });
  //   }
  // }, [video])



  // Before we can use HandLandmarker class we must wait for it to finish
  // loading. Machine Learning models can be large and take a moment to
  // get everything needed to run.

  async function createFaceLandmarker() {
    console.log("checking rendering ")
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 1
    });
    // setVideo(document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined)
    // video = document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined;

  }

  // const checkerFunc=()=>{

  // }

  useEffect(() => {
    createFaceLandmarker();

  }, [])
  const { useCallCallingState } = useCallStateHooks();

  // const {status}=useCameraState()
  const callingState = useCallCallingState();
  const {role}=useRolesContext()


  // useEffect(() => {
  //   // if (callingState === CallingState.JOINED) {
  //     if(status=='enabled'){

  //       console.log("i am joined ",status)
  //       console.log(document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined)
  //       // setVideo(document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined)
  //     }
  //     // setTimeout(() => {

  //     // }, 10000);
  //   // }
  // }, [status])

  // useEffect(() => {
  //   if (video) {

  //     const constraints = { video: true };
  //     console.log("ma ", video)

  //     navigator.mediaDevices.getUserMedia(constraints)
  //       .then((stream) => {
  //         if (video) {
  //           console.log("umesh sir ")
  //           video.srcObject = stream;
  //           video.addEventListener("loadeddata", predictWebcam);

  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error accessing webcam:', error);
  //       });
  //   }


  // }, [video])

  // useEffect(() => {
  //   if (callingState == CallingState.JOINED) {
  //     setTimeout(() => {

  //       const constraints = { video: true };
  //       let video = document.getElementsByClassName("str-video_video str-video_video--mirror")[0] as HTMLVideoElement | undefined

  //       navigator.mediaDevices.getUserMedia(constraints)
  //         .then((stream) => {
  //           if (video) {
  //             console.log("umesh sir ")
  //             // video.srcObject = stream;
  //             predictWebcam()
  //             // video.addEventListener("loadeddata", predictWebcam);

  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error accessing webcam:', error);
  //         });

  //     }, 10000);
  //   }
  // }, [callingState])

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel

  if (callingState !== CallingState.JOINED) return <Loader />;
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return (
          <div >
            <PaginatedGridLayout />
          </div>

        )
          ;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return (
          <div ref={videoRef}>
            <SpeakerLayout participantsBarPosition="right" />
          </div>
        );
    }
  };
const text=`Water is absolutely vital for life on Earth. It covers approximately 71% of our planet's surface, playing a crucial role in sustaining ecosystems and supporting human civilization. However, the majority of this water is saline, found in oceans, leaving only about 2.5% as freshwater, essential for drinking, agriculture, and sanitation. Unfortunately, a significant portion of this freshwater is inaccessible, trapped in glaciers and polar ice caps. Even more concerning is the fact that over 2 billion people worldwide lack access to clean drinking water due to pollution, inadequate infrastructure, and other challenges.

In developed countries like the United States, the average person consumes a staggering 100 gallons of water per day, highlighting the importance of responsible water usage. To address the growing issue of water scarcity and contamination, it is imperative that we prioritize conservation efforts, implement sustainable water management practices, and invest in technologies to improve access to clean water for all. By taking proactive measures to protect and preserve our freshwater resources, we can ensure a healthier future for both our planet and its inhabitants.`

const question= [
  {
    "answerSelectionType": "single",
    "answers": [
      "Saltwater",
      "Brackish",
      "Phytoplankton"
    ],
    "correctAnswer": "freshwater",
    "id": 1,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "What is the only water on Earth that is used for drinking and growing food?",
    "questionType": "text"
  },
  {
    "answerSelectionType": "single",
    "answers": [
      "Polar Caps",
      "Sea Levels",
      "Glaciers",
      "Ice Sheets",
      "Permafrost",
      "Oceans",
      "Arctic Ice"
    ],
    "correctAnswer": "ice caps",
    "id": 2,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "Where is most of the freshwater on Earth trapped?",
    "questionType": "text"
  },
  {
    "answerSelectionType": "single",
    "answers": [
      "Ice Sheets",
      "Oceans",
      "Sea Ice",
      "Lakes",
      "Antarctic",
      "Polar Caps",
      "Volcanic Activity",
      "Permafrost"
    ],
    "correctAnswer": "glaciers",
    "id": 3,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "Where is most of the freshwater on Earth trapped?",
    "questionType": "text"
  },
  {
    "answerSelectionType": "single",
    "answers": [
      "Pollutants",
      "Environmental Damage",
      "Carbon Emissions",
      "Greenhouse Gasses",
      "Oil Spills"
    ],
    "correctAnswer": "pollution",
    "id": 4,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "Why do people have no clean water?",
    "questionType": "text"
  },
  {
    "answerSelectionType": "single",
    "answers": [
      "Planet",
      "Moon",
      "Solar System"
    ],
    "correctAnswer": "earth",
    "id": 5,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "What is the most important place for life on earth?",
    "questionType": "text"
  },
  {
    "answerSelectionType": "single",
    "answers": [
      "Issues"
    ],
    "correctAnswer": "problems",
    "id": 6,
    "messageForCorrectAnswer": "Correct answer. Good job.",
    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
    "options_algorithm": "sense2vec",
    "point": "20",
    "question": "Why do people have no clean water?",
    "questionType": "text"
  }
]
const GenerateQuz=async()=>{
//   const response=await axios.post("http://localhost:5500/mcq_generation",JSON.stringify({
//     "data":text
//   }))
//   console.log("accept ",response)
// const data=await response.data;

// router.push(`/quiz?data=${JSON.stringify(question)}`)
toast.success("Quiz Generated Successfully")

}

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2 ', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
        {role=="Teacher" && <button onClick={GenerateQuz} >Generate Quiz</button>}
        <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover
              theme="dark"
            />
      </div>

    </section>

  );
};

export default MeetingRoom;