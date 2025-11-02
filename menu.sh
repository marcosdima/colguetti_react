#!/bin/bash

# Updates ANDROID_HOME. (Remove it if you needed)
export ANDROID_HOME=$HOME/Android/Sdk

# Load NVM environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
cd colguetti

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# --- Menu loop ---
while true; do
  clear
  echo -e "${CYAN}==============================="
  echo -e "         Build Menu"
  echo -e "===============================${NC}"
  echo -e "${YELLOW}1)${NC} Build Release (APK)"
  echo -e "${YELLOW}2)${NC} Debug"
  echo -e "${YELLOW}3)${NC} Exit"
  echo -e "${YELLOW}Any)${NC} Build dev"
  echo -e "${CYAN}===============================${NC}"
  read -p "Choose an option: " choice
	
  case $choice in
    1)
      clear
      echo -e "${GREEN}Running release build...${NC}"
      
      cd android
      ./gradlew assembleRelease
      cd ..
      
      echo -e "${GREEN}Release build completed!${NC}"
      read -p "Press Enter to return to menu..."
      ;;
    2)
      clear
      echo -e "${GREEN}Running Gradle debug build...${NC}"
      cd android || { echo -e "${RED}Android folder not found.${NC}"; read -p "Press Enter..."; continue; }
      ./gradlew clean --warning-mode all
      cd ..
      echo -e "${GREEN}Debug build completed!${NC}"
      read -p "Press Enter to return to menu..."
      ;;
    3)
      exit 0
      ;;
    *)
      clear
      echo -e "${GREEN}Running dev build... (Ctrl+C to stop)${NC}"
      npm run build:dev
      echo -e "${YELLOW}Dev build stopped.${NC}"
      read -p "Press Enter to return to menu..."
      ;;
  esac
done

