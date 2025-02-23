red='\033[0;31m'
blue='\033[0;34m'
green='\033[0;32m'
purple='\033[0;35m'
no_color='\033[0m'

# eg: option_value --pm=dnf
# $1: the entire option, with =
option_value() {
  echo "$1" | cut -d'=' -f2
}

# eg: cecho --mode=error "something went wrong!"
# $1: --mode={error,success,query,info}: the type of message
# $2: the message itself
cecho() {
  local mode
  case "$1" in
    --mode=*)
      mode=$(option_value "$1")
      ;;
    *)
      echo -e "${red}--mode={error,success,query,info}${no_color}"
      exit 1
      ;;
  esac

  case "$mode" in
    "error")
      echo -e "${red}$2${no_color}"
      ;;
    "success")
      echo -e "${green}$2${no_color}"
      ;;
    "query")
      echo -e "${blue}$2${no_color}"
      ;;
    "info")
      echo -e "${purple}$2${no_color}"
      ;;
    *)
      echo -e "${red}--mode={error,success,query,info}${no_color}"
      exit 1
      ;;
  esac
}
