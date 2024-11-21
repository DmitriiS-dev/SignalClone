import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from '@rneui/base'
import React from 'react'

// Import the local image
const defaultUserImage = require("../images/default_user.jpg");

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar
       rounded
       source={defaultUserImage}
       />

       <ListItem.Content>
        <ListItem.Title style={{fontWeight: '800'}}>
            YouTube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            This is a test subtitle
            This is a test subtitle
            This is a test subtitle
        </ListItem.Subtitle>
       </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})