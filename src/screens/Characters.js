import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Card from "../components/Card";
import Loader from "../components/Loader";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Characters extends Component {
    constructor(props) {
        super(props)
        this.state= {
            data: [],
            loading: true,
            next: "",
            pages: 0,
            totalCharacters: 0,
            prev: ""
        }
    }

    componentDidMount() {
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => response.json())
            .then((data) => this.setState({ 
                data: data.results, 
                loading: false, 
                next: data.info.next,
                pages: data.info.pages,
                totalCharacters: data.info.totalCharacters
             }))
            .then(() => console.log(this.state.data))
            .catch((err) => console.log(err))
    }

    nextPage() {
        this.setState({ loading: true }, 
        () => fetch(this.state.next)
            .then((response) => response.json())
            .then((data) => this.setState({
                data: data.results, 
                loading: false, 
                next: data.info.next,
                prev: data.info.prev,
            }))
            .catch((err) => console.log(err)))
    }

    prevPage() {
        this.setState({ loading: true }, 
        () => fetch(this.state.prev)
            .then((response) => response.json())
            .then((data) => this.setState({
                data: data.results, 
                loading: false, 
                next: data.info.next,
                prev: data.info.prev,
            }))
            .catch((err) => console.log(err)))
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading ? 
                    <Loader/> :
                    <View style={styles.container}>
                        <View style={styles.pagination}>
                            {
                                this.state.prev ?
                                <TouchableOpacity onPress={() => this.prevPage()}>
                                    <Text>Prev Page</Text>
                                </TouchableOpacity> :
                                <></>
                            }
                            <TouchableOpacity onPress={() => this.nextPage()}>
                                <Text>Next Page</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) =>  <Card character={ item }/>}
                            />
                        </View>
                    </View> 
                }
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth
    },
    card: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
    },
    pagination: {
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    }
  })

export default Characters;