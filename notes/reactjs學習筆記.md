# Reactjs 學習筆記

Reactjs 的使用注意事項

## React Component

* Component 函數的參數 props 是 react 規劃用來給 Component 儲存參數的變數, 例如:

  ```typescript
    function Greeting(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <UserGreeting />;
      }
      return <GuestGreeting />;
    }

    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <Greeting isLoggedIn={false} />,
      document.getElementById('root')
    );
  ```

* React Component 有唯一的使用限制 : 不允許變更 Component 函式輸入的參數  
  (原文是 `All React components must act like pure functions with respect to their props.`)
  例如這樣叫作未改變:

  ```javascript
  function sum(a, b) {
      return a + b;
  }
  ```

  React 稱呼這種函式為 **pure function**, 至於下面這種函式則稱為 **impure** :

  ```javascript
  function withdraw(account, amount) {
      account.total -= amount;
  }
  ```

* 當 React 第一次把元件輸出至畫面上時, 它會呼叫 **componentDidMount** 函式, 當某元件不再顯示時, 它會呼叫 **componentDidUnmount** 函式, 開發者可以藉由複寫這兩個函式來分別安排顯示後要變更內容的邏輯以及要執行的收尾作業

* React Component 藉由 state 屬性來儲存開發者會變更內容的元件  
  開發者可以先透過 this.state 語法在建構式設定要用來顯示的屬性, 例如 `this.state = {name:'martin'}`, 稍後在其他函式藉由 **this.setState** 函式變更狀態, 例如 `this.setState({name:'amanda'})`, React 就會再次呼叫 render 來重新調整 virtual dom 結構並且判斷是否需要調整畫面  
  運作方式可參考[範例][setState], 具體應用範例可參考[多層元件架構範例][lifting state up]
  
[setState]: http://jsbin.com/vezimusuxa/1/edit?html,js,console,output "setState 範例"
[lifting state up]: https://reactjs.org/docs/lifting-state-up.html "lifting state up"

* 在某些情況下, 開發者會希望元件不要產生任何內容, 這時候只要在 component 的函式回傳 `null` 即可, 範例如下:

  ```typescript
  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }

    return (
      <div className="warning">
        Warning!
      </div>
    );
  }
  ```

  值得注意的是... 這種做法僅僅是不輸出東西到畫面上, 但是 React 仍會在處理元件的過程中呼叫 **componentDidMount** 與 **componentDidUnmount**