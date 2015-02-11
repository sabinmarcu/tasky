/**
 * @jsx React.DOM
*/

var React = require('react'),
  Paper = mui.Paper, 
  FlatButton = mui.FlatButton,
  RaisedButton = mui.RaisedButton,
  DropDownMenu = mui.DropDownMenu;


var SomeAwesomeComponent = React.createClass({

  render: function() {
    return (
        <Paper zDepth="2">
            <FlatButton label="Cool" />
            <RaisedButton label="Cool" />
            <DropDownMenu menuItems={[{payload: 1, text: 'First'}, {payload: 2, text: 'Second'}]} />
        </Paper>
    );
  }

});

module.exports = SomeAwesomeComponent;