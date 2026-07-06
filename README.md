# 百度投放接手看板

这是一个只读看板：前端读取 `live-data.json` 展示账户消费、CPC、转化、搜索词追踪和异常提醒。

## 本地运行

双击 `start-dashboard.command`，或运行：

```bash
npm install
npm start
```

访问：

```text
http://127.0.0.1:8787/
```

## GitHub 在线版

推荐结构：

- GitHub Pages 托管静态看板；
- GitHub Actions 定时运行刷新器；
- 百度账号密码放在 GitHub Secrets，不写进代码；
- 刷新器更新 `live-data.json` 后重新部署页面。

需要在仓库 Settings -> Secrets and variables -> Actions 里配置：

| Secret | 用途 |
| --- | --- |
| `BAIDU_LOGIN_NAME` | 百度登录账号 |
| `BAIDU_LOGIN_PASSWORD` | 百度登录密码 |

注意：百度如果触发验证码、短信、安全验证，云端刷新器会停止并在 Actions 日志里提示，需要人工完成验证或改为更稳定的服务器方案。

### 推到 GitHub

当前目录已经是一个 Git 仓库。创建一个私有 GitHub 仓库后，在本地运行：

```bash
git remote add origin git@github.com:你的用户名/baidu-sem-dashboard.git
git push -u origin main
```

如果你使用 HTTPS 远程地址：

```bash
git remote add origin https://github.com/你的用户名/baidu-sem-dashboard.git
git push -u origin main
```

推上去后，在仓库 Settings -> Pages 里选择 GitHub Actions 部署；再到 Settings -> Secrets and variables -> Actions 添加 `BAIDU_LOGIN_NAME` 和 `BAIDU_LOGIN_PASSWORD`。

## 为什么不把密码写进代码

GitHub 仓库、提交历史和 Actions 日志都有泄露风险。这个项目支持自动登录，但必须通过 GitHub Secrets 或本机钥匙串读取密码。
