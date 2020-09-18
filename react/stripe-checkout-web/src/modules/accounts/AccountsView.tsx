import React, { PureComponent } from 'react'
import { Query } from 'react-apollo';
import { MeQuery } from '../../schemaTypes';
import { Link } from 'react-router-dom';
import SubscriptionView from './SubscribeView';
import { meQuery } from '../../graphql/queries/me';

export default class AccountView extends PureComponent {
  render() {
    return (
      <div>
          <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
            {({data, loading}) => {
                console.log('data', data);
                
                    if (loading) {
                        return null
                    }

                    if (!data) {
                        return <Link to="/login">Please login</Link>
                    }

                    if (!data.me) {
                        return <Link to="/login">Please login</Link>
                    }

                    const {me} = data;

                    if (!me.plan || me.plan === 'free-trial') {
                        return <SubscriptionView />
                    }
 
                    return <div>Email: {me.email} Plan: {me.plan}</div>
                }
            }
          </Query>
      </div>
    )
  }
}
