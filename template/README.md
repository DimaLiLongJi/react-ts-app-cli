# hlj-fronent

#### 登录流程

直接添加注解

```typescript
import { WithWechatAuth } from 'Components/with-wechat-auth';
import { WithAlipayAuth } from 'Components/with-alipay-auth';
import { WithAppAuth } from 'Components/with-app-auth';
import { WithWebAuth } from 'Components/with-web-auth';

@WithWechatAuth('1731a2bdecf84c0aa38f10501f39e7ba') // 微信授权
@WithAlipayAuth('1731a2bdecf84c0aa38f10501f39e7ba') // 支付宝授权
@WithWebAuth() // 网页登录
@WithAppAuth() // 86APP登录
export default class App extends React.Component<Props, State> {
}
```
