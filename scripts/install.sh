pip install -r requirements.txt

wget https://download.kiwix.org/release/kiwix-tools/kiwix-tools_linux-i586.tar.gz
tar -xvf kiwix-tools_linux-i586.tar.gz
sudo mv kiwix-tools_linux-i586-3.3.0-1/* /usr/local/bin

./download-default.sh

