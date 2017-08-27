## Netease Music Board

I'd like to visually show the results while i'm querying for netease music's api. And i'd also like to search netease music without opening its pages or applications.

So I creates this, Netease Music Board (NMB for short).

### Usage

Webpack:
```bash
npm install --save NMB
```
```javascript
import {NMB, apiLoader} from "NMB";
let nmb = new NMB();
    nmb.show();
apiLoader.search(/**/);
```

Normal:

```html
<script src="NMB.js"></script>
<script>
    const {NMB, apiLoader} = NeteaseMusicBoard;
    let nmb = new NMB();
        nmb.show();
    apiLoader.search(/**/);
</script>
```