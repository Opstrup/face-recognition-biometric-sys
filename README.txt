This file contains information about the project structure for the
02238-s160148-SFF handin in the course Biometric Systems at DTU - 2017


------------------------ preprocessing & ML --------------------------------
All preprocessing of the data and the CNN is written in python 2. The jupyter
notebook framework have been used to create a more readable project.

If the jupyter nootbook framework is not installed on the computer or you just
want a quick look at the code, you can just read the .py files.

The .py files can be found in the folder called python_scripts
Note: It is not recommended to run the .py files because of mismatch with
      file paths in the scripts. They are only meant for a quick read.
-----------------------------------------------------------------------------

------------------------- Enrollment system ---------------------------------
The enrollment system is written in the web framework NodeJS.
When all the dependicies for the project is installed the server can be started
by running the 'npm start' command in a terminal from the root folder of the
enrollment system.

The enrollment-subsystem can be found in the folder called enrollment-subsys

Important files:
enrollment-subsys/routes/index.js
  This file contains the endpoint for the web server. On line 15 is the
  function which gets run when a POST request gets sent to the server.

enrollment-subsys/public/javascript/script.js
  This file contains the javascript code which gets run in the browser and
  controlles the webcam and the POST mechanism to the server.

enrollment-subsys/views/index.pug
  This file contains the HTML for the enrollment system.
-----------------------------------------------------------------------------

----------------------- Smartphone application ------------------------------
The Android application source code can be found in the .zip folder called
Android. This is a standart Android Studio project.
-----------------------------------------------------------------------------
