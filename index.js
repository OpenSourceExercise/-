/**
 * 功能需求：
 * 1，点击 tab 栏，可以切换效果
 * 2，点击 + 号，可以添加 tab 项和内容项
 * 3，点击 x 号，可以删除当前的 tab 项和内容项
 * 4，双击 tab 项目文字或者内容项文字，可以修改里面的文字内容
 * 双击事件：ondblclick
 */
var _t;
class Tab {
  constructor(ele) {
    _t = this
    this.main = document.querySelector(ele)

    this.add = this.main.querySelector('.tabadd')
    // li 的父元素
    this.ul = this.main.querySelector('.nav ul')
    // section 的父元素
    this.fsection = this.main.querySelector('.tabscon')

    this.init()
  }

  // 获取所有的 li 和 section
  updateNode() {
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    this.spans = this.main.querySelectorAll('.nav li span:first-child')
  }

  // 初始化
  init() {
    this.updateNode()
    this.add.onclick = this.addTab
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab;
    }
  }
  // 切换
  toggleTab() {
    _t.clearClass()
    this.className = 'li_act'
    _t.sections[this.index].className = 'con_act'
    _t.sections[this.index].className = 'con_act';
  }

  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.sections[i].className = ''
    }
  }
  // 添加
  addTab() {
    _t.clearClass()
    const li = '<li class="li_act"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
    const section = '<section class="con_act">新标签内容' + Math.random() + '</section>'

    // 把这两个元素追加到对应的父元素里面
    _t.ul.insertAdjacentHTML('beforeend', li)
    _t.fsection.insertAdjacentHTML('beforeend', section)
    _t.init()
  }
  // 删除
  removeTab(e) {
    e.stopPropagation()  // 阻止冒泡，防止切换li的时候触发切换
    var index = this.parentNode.index
    _t.lis[index].remove() // remove()可以直接删除指定的元素
    _t.sections[index].remove()
    _t.init()

    // 当我们删除的不是选中的 li ，原来的选中状态 li 保持不变
    if (document.querySelector('.li_act')) return

    // 当我们删除了选中状态的li，让它的前一个 li 处于选中状态
    index--
    _t.lis[index] && _t.lis[index].click()  // 手动调用我们的点击事件，不需要鼠标触发

  }
  // 修改
  editTab() {
    var str = this.innerHTML
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = '<input type="text"/>'

    var input = this.children[0];
    input.value = str;
    input.select(); // 文本框里面的文字处于选定状态
    // 当我们离开文本框就把文本框里面的值给span 
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    // 按下回车也可以把文本框里面的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // 手动调用表单失去焦点事件  不需要鼠标离开操作
        this.blur()
      }
    }
  }
}
const tab = new Tab('#tab')