import React from "react";
import { Button, Segment, Divider, Label, Menu, Icon, Form, Header, List, Image, Dimmer, Loader, Message, Step, Grid, Table, Rating, Card, Feed, Comment, Rail, Sticky, Tab } from 'semantic-ui-react'

class Time extends React.Component {
	constructor(props) {
		super();

		console.log("Time.constructor:: props", props);

		this.state = {
			time: new Date().toString(),
			signed_in: false,
			username: props.username
		};

		let signed_in = false;
		let session;

		setInterval(() => {
			var time = new Date().toString();

			console.log("time", time);

			this.setState({time: time});

			if (!this.state.signed_in) {
					this.sendRequest("signin", {
						email: this.state.username,
						password: '43f01efbad6aa7be1fc5bfd8810229a24c93ad8b',
						device_info: {
							device_id: "111aaa222bbb-" + new Date().getTime()
						}
					})
					.then((response) => {
						console.log("response", response);

						if (response.success) {
							signed_in = true;

							session = response["set-cookies"] || session;

							this.setState({signed_in: signed_in, session: session, user: response.attachment.user});
						}
					});
			}
		}, 3000);
	}

	sendRequest = (command, params) => {
		return fetch(`https://vcapi-dev-gate.vcube.sg/v1`, {
				method: 'POST',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				command: command,
				data: params || {},
				cookies: this.state.session
				})				
			})
			.then((response) => {
				return response.json();
			});
	}

	getCurrentUserObject = () => {
		this.sendRequest("get_sync_candidates", {})
			.then((response) => {
				console.log("response", response);
			});
	}

	handleContextRef = contextRef => this.setState({ contextRef })

	renderButton = () => {
		const { contextRef } = this.state;

		const panes = [
		  {
		    menuItem: { key: 'users', icon: 'users', content: 'Users' },
		    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
		  },
		  {
		    menuItem: <Menu.Item key='messages'>Messages<Label>15</Label></Menu.Item>,
		    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
		  },
		]

		if (this.state.signed_in) {
			return (
				<Segment>
					<Label attached="top left">
					{" "}Current time: {this.state.time} {this.state.signed_in ? "true" : "false"}
					</Label>
					<Label as='a' color='red' ribbon="right">Singed in as {this.state.user.email}</Label>
					<Divider />
					<Grid stretched celled columns={2} container>
						<Grid.Row>
						<Grid.Column floated="left" width="10" stretched>
							<div ref={this.handleContextRef}>
								<Menu compact>
									<Menu.Item as='a'>
										<Icon name='mail' /> Messages
										<Label color='red' floating>999</Label>
									</Menu.Item>
									<Menu.Item as='a'>
										<Icon name='users' /> Friends
										<Label color='teal' floating>{this.state.user.friends.length}</Label>
									</Menu.Item>
								</Menu>
								
								<Segment>
									<Label as='a' attached="top">Friends</Label>

									<List horizontal>
										{this.state.user.friends.map((userId) => 
											(<List.Item key={userId}>
												<Image src='https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg' />
												<List.Header>
													{" "}{userId}
												</List.Header>
												<List.Content>
													Firstname: 
												</List.Content>
											</List.Item>)
										)}
									</List>

								</Segment>

								<Message>
									Wow! That&apos;s a lot of friends!
								</Message>
								
								<Comment.Group>
								<Header as='h3' dividing>Comments</Header>

								<Comment>
									<Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
									<Comment.Content>
									<Comment.Author as='a'>Matt</Comment.Author>
									<Comment.Metadata>
										<div>Today at 5:42PM</div>
									</Comment.Metadata>
									<Comment.Text>How artistic!</Comment.Text>
									<Comment.Actions>
										<Comment.Action>Reply</Comment.Action>
									</Comment.Actions>
									</Comment.Content>
								</Comment>

								<Comment>
									<Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
									<Comment.Content>
									<Comment.Author as='a'>Elliot Fu</Comment.Author>
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
									<Comment.Group>
									<Comment>
										<Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
										<Comment.Content>
										<Comment.Author as='a'>Jenny Hess</Comment.Author>
										<Comment.Metadata>
											<div>Just now</div>
										</Comment.Metadata>
										<Comment.Text>
											Elliot you are always so right :)
										</Comment.Text>
										<Comment.Actions>
											<Comment.Action>Reply</Comment.Action>
										</Comment.Actions>
										</Comment.Content>
									</Comment>
									</Comment.Group>
								</Comment>

								<Comment>
									<Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg' />
									<Comment.Content>
									<Comment.Author as='a'>Joe Henderson</Comment.Author>
									<Comment.Metadata>
										<div>5 days ago</div>
									</Comment.Metadata>
									<Comment.Text>
										Dude, this is awesome. Thanks so much
									</Comment.Text>
									<Comment.Actions>
										<Comment.Action>Reply</Comment.Action>
									</Comment.Actions>
									</Comment.Content>
								</Comment>

								<Form reply>
									<Form.TextArea />
									<Button content='Add Reply' labelPosition='left' icon='edit' primary />
								</Form>
								</Comment.Group>

								<Divider />

								<Button onClick={this.getCurrentUserObject}>Click Here</Button>
							</div>
							<Message success>
								<Icon name='check' />
								Logged in successfully!
							</Message>

							
							<Tab panes={panes} />
							

						</Grid.Column>

						<Grid.Column floated="left" width={4} stretched>
							<div>
							<Rail>
								<Sticky context={contextRef}>
									<Card fluid raised>
										<Card.Content>
											<Card.Header>
											Recent Activity
											</Card.Header>	
										</Card.Content>
										<Card.Content>
											<Feed>
											<Feed.Event>
												<Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
												<Feed.Content>
												<Feed.Date content='1 day ago' />
												<Feed.Summary>
													You added <a>Jenny Hess</a> to your <a>coworker</a> group.
												</Feed.Summary>
												</Feed.Content>
											</Feed.Event>

											<Feed.Event>
												<Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/molly.png' />
												<Feed.Content>
												<Feed.Date content='3 days ago' />
												<Feed.Summary>
													You added <a>Molly Malone</a> as a friend.
												</Feed.Summary>
												</Feed.Content>
											</Feed.Event>

											<Feed.Event>
												<Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
												<Feed.Content>
												<Feed.Date content='4 days ago' />
												<Feed.Summary>
													You added <a>Elliot Baker</a> to your <a>musicians</a> group.
												</Feed.Summary>
												</Feed.Content>
											</Feed.Event>
											</Feed>
										</Card.Content>
									</Card>
								</Sticky>
							</Rail>
							</div>
						</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			)
		}
		else {
			return (
					<Message icon>
					<Icon name='circle notched' loading />
					<Message.Content>
						<Message.Header>Signing in as {this.props.username}</Message.Header>
						Please wait as something great is about to happen.
					</Message.Content>
					</Message>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderButton()}
			</div> 
		)		
	}
}

export default Time;