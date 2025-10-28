# React调试
- 先把前端服务跑起来
- 点击 Run and Debug 面板的 create a launch.json 
- 选择 chrome 类型的调试配置 Web App（Chrome），会自动创建 .vscode/launch.json 文件
- 修改 launch.json 文件，添加 userDataDir 属性，值为false，并把url端口号修改为启动服务的端口号
- 点击Run and Debug面板选择 Launch Chrome against localhost ，点击绿色运行按钮，启动调试

注意：
 - 一个 userDataDir 对应一个浏览器实例，没有指定 userDataDir，默认是临时创建一个新的 userDataDir

