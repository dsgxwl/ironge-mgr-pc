/*
 * @Description: 按需引入
 * @Author: xiawenlong
 * @Date: 2020-12-16 19:19:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 14:47:39
 */
import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Button,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Loading,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar,
  Menu,
  MenuItemGroup,
  Submenu,
  MenuItem,
  Notification,
  Tabs,
  TabPane,
  Steps,
  Step,
  Table,
  TableColumn,
  Card,
  DatePicker,
  Select,
  Option,
  OptionGroup,
  Upload,
  Tree,
  Transfer,
  Popconfirm,
  Popover,
  MessageBox,
  Radio,
  RadioGroup,
} from 'element-ui'

const components = {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Button,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Loading,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar,
  Menu,
  MenuItemGroup,
  Submenu,
  MenuItem,
  Notification,
  Tabs,
  TabPane,
  Steps,
  Step,
  Table,
  TableColumn,
  Card,
  DatePicker,
  Select,
  Option,
  OptionGroup,
  Upload,
  Tree,
  Transfer,
  Popconfirm,
  Popover,
  MessageBox,
  Radio,
  RadioGroup,
}

Message.install = () => {
  Vue.prototype.$message = Message
}
Notification.install = () => {
  Vue.prototype.$notify = Notification
}
MessageBox.install = () => {
  Vue.prototype.$confirm = MessageBox.confirm
}

Object.values(components).forEach(component => {
  Vue.use(component)
})
