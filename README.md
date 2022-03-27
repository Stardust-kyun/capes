# Cape Authentication Server
Show custom capes on any client running Optifine by redirecting requests for Optifine's authentication servers to your own. Optifine capes will be used as a backup by default, and other cape sources are available by setting `useCosmeticaAsBackup` to `true`. 
### For Server:
* Install dependencies with `npm install express request fs`
* Run server with `node index.js` (sudo may be neccessary)
* Add cape files to `capes` following `USERNAME.png` (example given)
Note: you will likely need to open port 80 for this to work.
### For Client:
* Edit `/etc/hosts` and add `IPADDR s.optifine.net` where IPADDR is the IP of the computer running the server
### Credits
All of the credit here goes to eyezah for giving me his example script and walking me through the process. This is also based on Cosmetica services, which he made. Go check him out.
* [His website](https://eyezah.com/)
* [Cosmetica](https://cosmetica.cc/)
