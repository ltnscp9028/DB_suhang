import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';
import '../style/createlink.css';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;


class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    };

    render() {
        const handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        const { description, url } = this.state;
        return (
            <div>
                <div className="value_wrapper">
                    <input className="title" value={description} onChange={handleChange} name="description" placeholder="제목" />
                    <textarea className="url" value={url} onChange={handleChange} name="url" placeholder="내용" />
                </div>
                <Mutation
                    mutation={POST_MUTATION}
                    variables={{ description, url }}
                    onCompleted={() => this.props.history.push('/new/1')}
                    update={(store, { data: { post } }) => {
                        const first = LINKS_PER_PAGE
                        const skip = 0
                        const orderBy = 'createdAt_DESC'
                        const data = store.readQuery({
                            query: FEED_QUERY,
                            variables: { first, skip, orderBy }
                        })
                        data.feed.links.unshift(post)
                        store.writeQuery({
                            query: FEED_QUERY,
                            data,
                            variables: { first, skip, orderBy }
                        })
                    }}
                >
                    {postMutation => <button className="submit_btn" onClick={postMutation}>등록</button>}
                </Mutation>
            </div>
        )
    }
}

export default CreateLink;