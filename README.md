## 前端自动化工具集

### 安装

```bash
npm install @jqy518/ystool --save-dev
```

### 使用

#### `svn`

使用场景，项目源码与生产代码目录不在同一 SVN 仓库时，可以通过此工具对生产代码目录进行 SVN 提交，更新;

使用例子：

```bash
ystool svn D:\projects\pms\ -u

ystool svn --help
```
