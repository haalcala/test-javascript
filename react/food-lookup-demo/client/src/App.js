import React, { Component } from "react";
import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import EventEmitter from 'events'
import Time from "./Time";
import { Button, Segment, Divider, Label, Menu, Icon, Form, Header, List, Image, Dimmer, Loader, Message, Step, Table, Rating } from 'semantic-ui-react'

class App extends Component {
	constructor(props) {
		super(props);

		global.app_util = new EventEmitter();

		setInterval(() => {
			global.app_util.emit("global_time", new Date());
		}, 1000)
	}
	
	state = {
		selectedFoods: []
	};

	removeFoodItem = itemIndex => {
		const filteredFoods = this.state.selectedFoods.filter(
			(item, idx) => itemIndex !== idx
		);
		this.setState({ selectedFoods: filteredFoods });
	};

	addFood = food => {
		const newFoods = this.state.selectedFoods.concat(food);
		this.setState({ selectedFoods: newFoods });
	};

	getTime = (username) => {
		return <Time username={username} />
	};

	render() {
		const { selectedFoods } = this.state;

		const steps = [
			{ active: true, icon: 'mail', title: 'Register', description: 'Enter your email  ' },
			{ disabled: true, icon: 'payment', title: 'Confirm', description: 'Enter account information' },
			{ disabled: true, icon: 'check', title: 'Login', description: "Login" },
		];

		return (
			<div className="App">
				<div className="ui container">
					
					{this.getTime("harold.alcala+dev@vcube.co.jp")}

					<Divider />

					{this.getTime("harold.alcala+dev0000@vcube.co.jp")}

					<Segment>
						<Label ribbon="right">New account</Label>

						<Step.Group items={steps} />
					</Segment>

						<Table celled padded>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
									<Table.HeaderCell>Effect</Table.HeaderCell>
									<Table.HeaderCell>Efficacy</Table.HeaderCell>
									<Table.HeaderCell>Consensus</Table.HeaderCell>
									<Table.HeaderCell>Comments</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								<Table.Row>
									<Table.Cell>
										<Header as='h2' textAlign='center'>A</Header>
									</Table.Cell>
									<Table.Cell singleLine>Power Output</Table.Cell>
									<Table.Cell>
										<Rating icon='star' defaultRating={3} maxRating={3} />
									</Table.Cell>
									<Table.Cell textAlign='right'>
											80% <br />
										<a href='#'>18 studies</a>
									</Table.Cell>
									<Table.Cell>
											Creatine supplementation is the reference compound for increasing muscular creatine levels; there is
											variability in this increase, however, with some nonresponders.
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>
										<Header as='h2' textAlign='center'>A</Header>
									</Table.Cell>
									<Table.Cell singleLine>Weight</Table.Cell>
									<Table.Cell>
										<Rating icon='star' defaultRating={3} maxRating={3} />
									</Table.Cell>
									<Table.Cell textAlign='right'>
											100% <br />
										<a href='#'>65 studies</a>
									</Table.Cell>
									<Table.Cell>
											Creatine is the reference compound for power improvement, with numbers from one meta-analysis to assess
											potency
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>

					<SelectedFoods
						foods={selectedFoods}
						onFoodClick={this.removeFoodItem}
					/>

					<FoodSearch onFoodClick={this.addFood} />
				</div>
			</div>
		);
	}
}

export default App;
