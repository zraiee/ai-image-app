🔧 Possible Solutions

1️⃣ Check if Node.js and npm are installed
Since npm comes bundled with Node.js, first check if Node.js is installed by running:

bash
نسخ
تحرير
node -v
If you see a version number (e.g., v18.16.0), then Node.js is installed. If not, you need to install it.

📌 To fix this:

Download and install Node.js from the official website: 🔗 https://nodejs.org/
Choose the LTS (Long-Term Support) version for stability.
During installation, make sure to check the option "Add to PATH".
Once installed, restart your computer.

2️⃣ Verify npm installation
After installing Node.js, check if npm is working by running:

bash
نسخ
تحرير
npm -v
If this command fails, proceed to the next solution.

3️⃣ Add npm to the System PATH Variable
If Node.js and npm are installed, but the system doesn't recognize npm, you need to manually add it to the PATH variable.

Steps to add npm to the PATH manually:
Open Environment Variables:

Press Win + R and type:
plaintext
نسخ
تحرير
sysdm.cpl
Press Enter to open System Properties.
Go to the "Advanced" tab and click "Environment Variables".
Find the Path variable under "System Variables":

Select "Path" and click "Edit".
Click "New" and add the following directory (depending on your installation):
plaintext
نسخ
تحرير
C:\Program Files\nodejs\
Click OK to save changes.
Restart your computer and then try running:

bash
نسخ
تحرير
npm -v

4️⃣ Reinstall npm Manually
If npm is still not recognized, try reinstalling it:

bash
نسخ
تحرير
npm install -g npm
