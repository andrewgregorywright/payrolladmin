



## Installation

To install this website on Ubuntu 16.04, complete the following steps:

- Install Node.js version 16.13.0.  To do this, I usually install nvm for the user on the machine running the website.
- git clone ____
- cd ______
- npm install
- npm run mk-log
- install [mongodb version 4.4 community edition](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-ubuntu/).
- 



## Important notes

I implemented things in a slightly different manner in this project in order to make it more self-contained,
as well as to save time.  Among them are the following:

- The configuration file, payrolladmin.conf, would normally be located outside of the directory for
the project.  On a Linux system, I generally deploy it to the /etc folder of the machine running the
website, in order to adhere to standards for the File System Hierarchy.  However, in this project,
for the sake of simplicity, it's in the same folder as the website.
- Similar to the above point concerning payrolladmin.conf, log files are usually kept in the /var/log
directory.  However, in order to make this project more self-contained, it serializes the logs to the
log subdirectory within the directory of the project.  Also, on a Linux system, I would use logrotate
in order to maintain the logs as well as available disk space on the machine.  Also, the logs are being
serialized to the database, too.
- Generally speaking, I would create a build process using a combination of webpack and bash scripting.
For this project, however, it was not necessary.  Please feel free to ask me if you would like more
information as to why.
- The reason for the separate repository and service layers in the data-access layer is so that the
service layer can be unit-tested by mocking out the repository layer.  However, the operations in this
website for the service layer are really just pass-through operations to the repository layer, obviating
the need for unit tests at this time.  However, if the website were to increase in complexity, this
would become useful.
