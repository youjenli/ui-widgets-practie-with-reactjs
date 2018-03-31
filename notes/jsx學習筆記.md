# jsx 學習筆記

## jsx 的特性

1. jsx 語法的性質等同於 javascript 的 expression, 因此可以把結果指給變數, 例如:
  
  ```typescript
  let button = <LogoutButton onClick={this.handleLogoutClick} />;
  ```

  接著其他 jsx 句子也可以再藉著大括號 `{}` 引用此變數

  ```
  // js 類別內容...略
  render() {
  const isLoggedIn = this.state.isLoggedIn;

  let button = null;
  if (isLoggedIn) {
    button = <LogoutButton onClick={this.handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={this.handleLoginClick} />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );
  // js 類別內容...略
  ```

  此外還可以直接在 jsx 裡面用大括號來表達某些在特定情境下才要顯示的內容

  ```
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length}  unreadmessages.
          </h2>
        }
      </div>
    );
  }   
  ```

  這種做法能正常運作的原因是 javascript 的轉譯器會解讀 `true && expression` 句型為 expression


## 為 jsx 元素綁定事件處理器

jsx 元素的事件觸發器可以定義在 Component 裡面並且寫在元素的屬性上面, 就像下面這樣

```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

要注意的是 React 有為這些監聽函式合成事件以克服跨平台相容性的問題, 欲知詳情請參閱[官方文件][handling-events]

[handling-events]: https://reactjs.org/docs/handling-events.html

另外, 如果事件處理函式裡面會透過 __this__ 存取該元件的實例, 那記得要事先綁定該函式 this 所指的物件, 因為 javascript 類別裡的函式預設不會綁定 this 指稱的對象  
以下範例說明以上概念:

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

或著也可以在 jsx 的屬性裡面用 ES6 的 arrow function 指定處理函式的所有者, 進而使處理函式裡面的 this 能參考到類別的實例

```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

但是這種做法有個缺點, 就是它每次重新顯示元素時, 都會再產生一個 callback  
大部分情況下這沒什麼問題, 但如果此 callback 會被當成參數傳遞至一個內層的函式, 那就有可能會導致 React 多次重新塗層元件造成效能問題  
為避免這種情況, React 官方建議不要使用這種寫法

你可以從下面兩種寫法中選擇一種來提供額外的參數給事件處理器

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 迭代顯示特定集合內的元素

jsx 可以搭配 ES6 陣列的 map 函式迭代顯示特定集合內的元素:

```typescript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

然後還可以進一步把範例中的 ul 清單整理為元件

```typescript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

但是執行此例的時候, react 會跳出警告訊息說要為每項清單元素準備一把 `key`  
這是用來讓 react 知道元件裡面根據特定陣列產生的元素是否有增減與變更, 陣列裡的元素都應該要有一把固定不變的 key, 而且在陣列內要獨一無二

```typescript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

同理, 想提取一個用來呈現集合內容的 html 元素為 React 元件時, 就要給此元素用來識別的金鑰

```typescript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

若清單元素沒有適合作為金鑰的值時, 可以改用陣列的索引, 例如:

```typescript
//上略
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
//下略
```

但要注意的是當元素的順序有可能改變時, React 建議不要使用索引值以免造成效能問題  
另外, 因為 React 不會把 key 屬性以及它的值輸出到畫面上, 所以若想要金鑰作為元素屬性的值, 那就要標記在另外的屬性上

```typescript
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

## jsx 元素與 Html 元素設計不同之處

### 沒有 value 屬性的表單元素

為了讓表單的 `input`, `textarea`, `select` 以類似的方式運作, Reactjs 的 jsx 使用 **value** 屬性來指定他們的內容, 以下是 textarea 的例子:

```typescript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

另外, html 的下拉選單原本要藉由 option 元素的 selected 屬性指定預設值, React 則是在 select 元素上以 value 屬性來指定預設勾選的元素
  
```typescript
//上略
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Pick your favorite La Croix flavor:
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
//下略
```

要是想選擇多個項目, 那可以藉由 `multiple` 屬性告訴 react 並且餵一個陣列給 `value`:

```typescript
//上略
<select multiple={true} value={['B', 'C']}>
//下略
```

## 使用注意事項

1. 根據 React 官方文件的說明, 因為 jsx 也是 javascript expression, 而且它比較像 js 而不是 html (Since JSX is closer to JavaScript than to HTML) , 所以 react 官方使用 `camelCase` 來表達元素的屬性名稱, 例如以 `className` 表達 `class`

2. React DOM 會把所有嵌入到 JSX 的字串逃逸掉, 這樣可以避免 XSS 攻擊

3. jsx 使用已事先定義的 Component 時, 要以大寫開頭, 否則 React 會視為一般 html 元素處理
  但是 jsx 並未禁止使用 `-` , 你可以用 `data-xxx` 的方式表達 html 的 data attribute
