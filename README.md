# Project Title : [Eduproctor](edu-proctor.vercel.app/)

Eduproctor is an innovative platform aimed at enhancing online learning experiences through real-time eye tracking and AI-generated quizzes.



## Introduction

Eduproctor addresses the challenges faced by students in online learning environments, such as distractions and lack of engagement, by leveraging cutting-edge technologies.
With real-time eye tracking and AI-generated quizzes, Eduproctor aims to improve student focus and comprehension during online classes.




![Flow](https://github.com/AkhileshJyotishi/EduProctor/assets/119918405/22f465b6-8611-43cc-a320-7a075532af45)  ![AI-Show](https://github.com/AkhileshJyotishi/EduProctor/assets/119918405/49d1f51d-acd8-4ea7-b785-f40e50c6242a)

## Configuration & Installation


To get started with Eduproctor, ensure you have the following dependencies and tools installed:

### Frontend

2. Next.js: Eduproctor is built using Next.js, a React framework for server-rendered applications along with webrtc . Install it globally using npm :

   ```
   npm install -g next
   ```

Once you have installed the necessary dependencies, follow these steps to set up the development environment:

1. Clone the Eduproctor repository from GitHub:
   ```
   git clone https://github.com/AkhileshJyotishi/EduProctor.git
   ```
2. Navigate to the project directory:
   ```
   cd EduProctor
   ```
3. Install project dependencies:
   ```
   npm install
   ```
4. Create a .env file in the root directory and add all environment variables.
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

   CLERK_SECRET_KEY=
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   NEXT_PUBLIC_STREAM_API_KEY=

   STREAM_SECRET_KEY=
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to http://localhost:3000 to access Eduproctor.

### Backend

1. Download Python version 3.8 and it to your Environmental variables.

2. Set up virtual environment using following command :
    ```
    pip install virualenv
    
    cd backend

    cd QuestionGeneration
    
    python3.8 -m venv <virtual-environment-name>

    ```
3.  ```
       pip install flask

       pip install Flask-Cors

       pip install mediapipe
    ```
4. Run Following Commands 
   ```
    python -m nltk.downloader universal_tagset
      
    python -m spacy download en

    pip install -U pip setuptools wheel

    pip install -U spacy

    python -m spacy download en_core_web_sm
   ```
5. You can download the weights from here:
```
wget https://github.com/explosion/sense2vec/releases/download/v1.0.0/s2v_reddit_2015_md.tar.gz

tar -xvf  s2v_reddit_2015_md.tar.gz
```
## Details

Eduproctor offers a range of features designed to enhance the online learning experience:

### 1.  Real-Time Eye Tracking:

  - Eduproctor employs real-time eye tracking technology to monitor students' attention during online classes.

  - If distractions are detected, alerts are sent to students, prompting them to refocus on the lesson.


### 2.  AI-Generated Quizzes:

  - The platform utilizes AI algorithms to generate personalized quizzes based on the lesson content.

  - Quizzes are dynamically generated using keywords extracted from the material, ensuring relevance and alignment with lesson objectives.

### 3.Seamless Integration:

  - Eduproctor seamlessly integrates with existing online learning platforms, providing a seamless experience for both students and educators.

  - Teachers can easily incorporate Eduproctor into their online classes to enhance student engagement and comprehension.




## Contributors

The following individuals have contributed to the EZCompose project:


### 1. [Akhilesh Jyotishi](https://github.com/AkhileshJyotishi)

 - Role: Frontend Developer
 - Responsibilities: Did AI integration with frontend i.e. integrating realtime webrtc with tensorflow.js and mediapipe.

### 2. [Yash Agarwal](https://github.com/Yash7426)

 - Role: Frontend Developer
 - Responsibilities:Integrating AI quiz generator and realtime speech to text with Online Meet. 

 ### 3. [Darsh Baxi](https://github.com/darshbaxi)

 - Role: AI-ML Engineer
 - Responsibilities: MCQ Generation using T5-transformers.Extract keywords using PKE and mapping sentence with keywords using FlashText and generating wrong options for question using Sense2vec.

### 2. [Samarth sahu](https://github.com/Samcoding5854)

 - Role: AI-ML Engineer
 - Responsibilities: Assisted in developing logic and functions for detecting yawning and distractions using TensorFlow.js and MediaPipe.



