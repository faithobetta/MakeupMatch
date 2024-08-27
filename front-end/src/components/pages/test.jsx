Deploying a MERN (MongoDB, Express, React, Node.js) application on Hostinger using SSH involves more direct server interaction. Here’s a step-by-step guide to deploying your app via SSH:

### Prerequisites:
1. *Hostinger Account* with a hosting plan that supports Node.js and SSH access.
2. *Domain Name* (optional but recommended).
3. *MongoDB Atlas Account* (or any MongoDB instance).
4. *SSH Client* (e.g., Terminal on macOS/Linux, PuTTY on Windows).

### Step 1: Set Up MongoDB
1. *Create a MongoDB Atlas Account*:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and a database user.
   - Whitelist your IP address.
   - Obtain your MongoDB URI (Connection string).

### Step 2: Prepare Your Application
1. *Build the React Application*:
   - In your React project directory, run:
     bash
     npm run build
     
   - This creates a build folder with the static files of your React app.

2. *Configure the Node.js/Express Server*:
   - Ensure your server file (server.js or app.js) serves the React build files. For example:
     javascript
     const express = require('express');
     const path = require('path');
     const app = express();

     app.use(express.static(path.join(__dirname, 'build')));

     app.get('/*', (req, res) => {
       res.sendFile(path.join(__dirname, 'build', 'index.html'));
     });

     const port = process.env.PORT || 5000;
     app.listen(port, () => {
       console.log(`Server running on port ${port}`);
     });
     

3. *Update Environment Variables*:
   - Ensure your MongoDB URI and other environment variables are correctly set up in your server.js or .env file.

### Step 3: SSH into Your Hostinger Server
1. *Obtain SSH Access Details*:
   - In the Hostinger dashboard, go to *Hosting* > *Manage* > *SSH Access* to get your SSH username, password, and server IP.

2. *Connect via SSH*:
   - Open your terminal (macOS/Linux) or PuTTY (Windows).
   - Connect to your server using the following command:
     bash
     ssh username@server_ip
     
   - Replace username with your SSH username and server_ip with your server's IP address.

   - Enter your password when prompted.

### Step 4: Set Up the Node.js Environment on Hostinger
1. *Navigate to the Public HTML Directory*:
   bash
   cd ~/public_html
   

2. *Clone Your Repository or Upload Files*:
   - If your project is on GitHub or another Git repository, clone it:
     bash
     git clone https://github.com/yourusername/yourrepository.git
     
   - If you need to upload files manually, use an FTP client to upload your project files to the public_html directory.

3. *Install Dependencies*:
   - Navigate to your project directory:
     bash
     cd yourrepository
     
   - Install Node.js dependencies:
     bash
     npm install
     

### Step 5: Configure Environment Variables and Start the Application
1. *Set Up Environment Variables*:
   - You can create a .env file in your project directory or export variables directly in the terminal:
     bash
     export MONGODB_URI='your_mongodb_uri'
     export PORT=3000
     

2. *Start the Application*:
   - You can use a process manager like PM2 (recommended) or simply run the server with Node.js:
     bash
     npm install -g pm2
     pm2 start server.js --name "myapp"
     
   - This will keep your app running in the background.

   - To make sure PM2 starts your app on server boot, run:
     bash
     pm2 startup
     pm2 save
     

### Step 6: Configure the Domain/Subdomain (Optional)
1. *Set Up Domain/Subdomain*:
   - In the Hostinger dashboard, go to *Domains* and set your domain or subdomain to point to your application.

2. *Edit the Nginx Configuration (if needed)*:
   - If you need to set up a reverse proxy or make custom changes, you may need to edit the Nginx configuration file:
     bash
     sudo nano /etc/nginx/sites-available/default
     
   - Make the necessary changes and restart Nginx:
     bash
     sudo systemctl restart nginx
     

### Step 7: Configure SSL (Optional but Recommended)
1. *Install Certbot*:
   - Install Certbot to enable HTTPS with Let’s Encrypt:
     bash
     sudo apt-get install certbot python3-certbot-nginx
     

2. *Obtain and Install SSL Certificate*:
   - Run Certbot:
     bash
     sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
     

3. *Auto-Renew SSL*:
   - Set up a cron job for automatic SSL renewal:
     bash
     sudo crontab -e
     
   - Add the following line:
     bash
     0 0 * * * /usr/bin/certbot renew --quiet
     

### Step 8: Monitor and Maintain Your Application
1. *Check Application Logs*:
   - Use PM2 to check logs and monitor the app:
     bash
     pm2 logs
     

2. *Update Application*:
   - To deploy updates, you can pull the latest changes from your Git repository, install any new dependencies, and restart PM2:
     bash
     git pull origin main
     npm install
     pm2 restart myapp
     

### Final Notes:
- *Database Security*: Ensure that your MongoDB instance is secure, with IP whitelisting and strong passwords.
- *Performance Optimization*: Consider using a CDN for your React app, optimizing images, and enabling Gzip compression.
- *Backup*: Regularly back up your application and database.

Following these steps should get your MERN application up and running on Hostinger using SSH!