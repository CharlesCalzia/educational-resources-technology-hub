# Enable SSH


sudo apt update -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install -y docker-ce

sudo apt install -y python3
sudo apt install -y python3-pip

pip install -r requirements.txt

sudo ./download-default.sh

cd ..
docker compose build
docker compose up