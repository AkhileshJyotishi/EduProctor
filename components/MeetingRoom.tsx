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
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

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

    console.log("this predictWebcam just ogot ext")
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await faceLandmarker.setOptions({ runningMode: runningMode });
    }
    let startTimeMs = performance.now();
    console.log(lastVideoTime, " ", video?.currentTime)
    if (lastVideoTime !== video?.currentTime) {
      lastVideoTime = video.currentTime;
      results = faceLandmarker.detectForVideo(video, startTimeMs);
      console.log("akhilesh ", results)
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
      </div>
    </section>
  );
};

export default MeetingRoom;