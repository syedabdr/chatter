import React from 'react'
import {Avatar ,useChatContext} from 'stream-chat-react';

//the page s for previewing the groups on the chat applictaion
const TeamChannelPreview = ({setActiveChannel,setIsCreating,setIsEditing,setToggleContainer,channel , type}) => {
    const {channel: activeChannel, client } =useChatContext();
    const ChannelPreview =() => (
        <p className='channel-preview__item'>
            # {channel?.data?.name || channel?.data?.id}    {/*? to confirm if channel exist for checking further*/}
        </p>
    );


    const DirectPreview =() => {
        const members = Object.values(channel.state.members).filter( ({user}) => user.id !== client.userID); //All ids except our
        
        return(
            <div className='channel-preview__item single'>
                <Avatar
                        image={members[0]?.user?.image}
                        name={members[0]?.user?.fullName || members[0]?.user?.id}
                        size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }
    return (
        //if the chat to be previewd is selected chat then class name is 1 one else 2 one
        // onClick(ing) specific chat select channel name
    <div className= {
        channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
    onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if(setToggleContainer){
            setToggleContainer((prevState)=> !prevState)
        }
    }}
    >
        {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}
    </div>
  )
}

export default TeamChannelPreview
