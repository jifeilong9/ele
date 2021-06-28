
//初始化
var dev_hight = device.height;
var dev_width = device.width;
if(dev_hight && dev_width == 0) {toastLog('BUG啦，请重启手机');exit();}
console.show();

//子线程 音量键关闭
threads.start(function(){
  events.observeKey();
events.onKeyDown("volume_up", function(event){toastLog("\n音量+被按下，即将结束脚本！");sleep(3000);console.hide();exit();});
});

//检测并点击
function check_click() {
  text('下单任务').waitFor();

  sleep(2000);
  let list_15sec = textContains('15秒').find();
  sleep(500);
  let list_0sec = textContains('浏览').find();

  for(i = 0; i < list_15sec.length; i++){
    if(list_15sec[i] && list_15sec[i].parent().child(2).text() != '奖励已到账') {       
      list_15sec[i].parent().child(2).click();
      console.log(list_15sec[i].parent().child(0).getText())
      console.log('等待...\n');
      textMatches("任务完成|点击返回").waitFor();
      back();
      sleep(3000);
    }    
  }
  
  for(i = 0; i < list_0sec.length; i++){
    if(list_0sec[i] && list_0sec[i].parent().child(2).text() != '奖励已到账') {
      list_0sec[i].parent().child(2).click();
    	sleep(3000);
    	back();
    	sleep(3000);
    }
  }
  toastLog('任务基本完成');
}


//启动并跳转

toastLog('启动饿了么\n按下音量+ 脚本停止');
home();sleep(2000);
app.startActivity({
  packageName: "me.ele",
  data: 'eleme://web?&url=https://h5.ele.me/svip/task-list'
  });

check_click();

