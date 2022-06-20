import React from "react";
import { Icon, Button, Comment, Header } from "semantic-ui-react";

function Feedbacks() {
  return (
    <Comment.Group style={{ margin: 30 }}>
      <Header as="h3" dividing>
        Feedbacks
      </Header>

      <Comment style={{ margin: 15 }}>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Button animated color="red">
            <Button.Content visible>Delete</Button.Content>
            <Button.Content hidden>
              <Icon name="trash alternate" />
            </Button.Content>
          </Button>
        </Comment.Content>
      </Comment>

      <Comment style={{ margin: 15 }}>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Comment style={{ margin: 15 }}>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <div>5 days ago</div>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
}

export default Feedbacks;
