/// <reference types="React" />
/// <reference types="react-dom" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MenuItem } from './components/menuItem';
import { MenuLayout } from './fixedMenuLayout';

interface offCanvasMenuLayoutState extends MenuLayout {
    isMenuActive?:boolean;
}

class OffCanvasMenuLayout extends React.Component<offCanvasMenuLayoutState, offCanvasMenuLayoutState> {
    constructor(props) {
        super(props);
        if (!this.props.hasOwnProperty('isMenuActive')) {
            props['isMenuActive'] = false;
        }
        this.state = props;
        
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu (e) {
        e.preventDefault();
        this.setState({
            isMenuActive:!this.state.isMenuActive
        });
    }
    render() {
        const menuItems = this.state.menuItems.map(item => (<a href={item.url}>{item.name}</a>));
        const menuClasses = this.state.isMenuActive ? 'offCanvasMenu active': 'offCanvasMenu';
        const contentClasses = this.state.isMenuActive ? 'content active' : 'content';

        return (
            <div className="widget offCanvasLayout">
                <div className={menuClasses}>
                    <a href="javascript:void(0)" className="closeBtn" onClick={this.toggleMenu}>&times;</a>
                    {menuItems}
                </div>
                <div className={contentClasses}>
                    <h2>{this.state.title}</h2>
                    <p>
                       <button onClick={this.toggleMenu}>Show Menu</button>
                    </p>
                    <p>{this.state.content}</p>
                </div>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const title = 'Lorem Ipsum Dummy Text Within Form Field Box';
    const content = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
    
    Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
    
    Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
    
    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.
    
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. 
    
    Consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    `;
    const menuItems = [{
        name:'Google',
        url:'https://www.google.com.tw'
    },{
        name:'Yahoo',
        url:'https://tw.yahoo.com'
    }
    ];
    const isMenuActive = false;
    ReactDOM.render(
        <OffCanvasMenuLayout title={title} content={content} menuItems={menuItems} isMenuActive={isMenuActive} />,
        document.getElementById('react-root')
    );
});