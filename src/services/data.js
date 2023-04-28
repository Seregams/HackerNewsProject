import axios from "axios";

const https = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'


export async function getDataIds () {
    const response = await axios.get(https)
    const dataIds = response.data
    const arr = []
    for (let i = 0; i < 30; i++) {
        const dataById = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${dataIds[i]}.json?print=pretty`)
        arr.push(dataById.data)
    }
    return arr
}

export async function getStoryData(id) {
    const storyArr = []
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    storyArr.push(response.data)
    return storyArr
}

export async function getComment(item) {
    const commentArr = []
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
    commentArr.push(response.data)
    return commentArr
}