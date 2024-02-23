#!/bin/bash

#goto dist
echo "Changing work directory to 'dist'"
cd dist || echo "Missing 'dist', build project with package manager!"
pwd
ls

echo "Taring 'dist'..."
tar -czvf trhun.tar.gz trhun/browser || echo "Failed to tar"

scp trhun.tar.gz hrvoje@192.168.0.250:~/web-deploy || echo "Failed to scp"

# Run remote deployment script
ssh hrvoje@192.168.0.250 "/home/hrvoje/web-deploy.sh"

#delete local tar
rm trhun.tar.gz
cd "$ROOT_WORK_DIR" || echo "This really should not have failed..."
