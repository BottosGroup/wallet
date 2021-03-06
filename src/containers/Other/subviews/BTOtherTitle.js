import React,{PureComponent} from 'react'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
const BlockBrowsingMessages = messages.BlockBrowsing;

export default class BTOtherTitle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="everyTitle">
                <h3>
                    <FormattedMessage {...BlockBrowsingMessages.BlockBrowsing}/>
                </h3>
                <p>
                    <FormattedMessage {...BlockBrowsingMessages.WelcomeToBlockBrowsing}/>
                </p>
            </div>
        )
    }
}