sudo apt-get update -y && sudo apt-get upgrade

# Download docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=armhf signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu bionic stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
sudo apt-get install docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker



sudo apt install -y python3
sudo apt install -y python3-pip

pip install -r requirements.txt
