#!/bin/zsh
set -e

SERVICE="baidu-sem-dashboard"
ACCOUNT="BDCC-天津全包圆管家"

echo "这个脚本只会把百度登录密码保存到你 Mac 本机钥匙串。"
echo "不会写入看板代码，也不会写入 live-data.json。"
echo
read "LOGIN_NAME?百度登录账号/用户名（默认：$ACCOUNT）："
LOGIN_NAME="${LOGIN_NAME:-$ACCOUNT}"
read -s "LOGIN_PASSWORD?百度登录密码："
echo

if [ -z "$LOGIN_PASSWORD" ]; then
  echo "未输入密码，已取消。"
  exit 1
fi

security delete-generic-password -a "$LOGIN_NAME" -s "$SERVICE" >/dev/null 2>&1 || true
security add-generic-password -a "$LOGIN_NAME" -s "$SERVICE" -w "$LOGIN_PASSWORD" -U

echo "已保存到本机钥匙串。现在可以重新点看板里的“刷新百度数据”。"
