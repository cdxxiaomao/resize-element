const { exec } = require('child_process');

// 自定义配置多个推送地址
const publishConfigurations = [
  { registry: 'https://registry.npmjs.org/', tag: 'latest' },
];
function publishToAll (configurations) {
  const queue = [...configurations]; // 复制配置数组以免修改原始数组

  function publishNext () {
    if (queue.length === 0) {
      console.log('所有推送任务完成');
      return;
    }

    const config = queue.shift();
    const { registry, tag } = config;
    const command = `npm publish --registry=${registry} --tag=${tag}`;

    console.log(`开始推送【${tag}】至 ${registry}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`推送至 ${registry} 失败:`, error.message);
      } else if (stderr) {
        console.error(`任务消息 ${registry} :`, stderr);
      } else {
        console.log(`推送至 ${registry} 完成：`, `npm publish --registry=${registry} --tag=${tag}`);
      }

      // 处理下一个任务
      publishNext();
    });
  }

  // 开始处理队列中的任务
  publishNext();
}

publishToAll(publishConfigurations);
