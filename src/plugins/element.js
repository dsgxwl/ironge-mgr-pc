import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
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
} from 'element-ui'
Message.install = () => {
  Vue.prototype.$message = Message
}
Notification.install = () => {
  Vue.prototype.$notify = Notification
}
const components = {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
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
}
Object.values(components).forEach(component => {
  Vue.use(component)
})
