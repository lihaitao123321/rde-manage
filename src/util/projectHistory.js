export default{
    addHistory(id){
        let list = this.getHistoryList()
        list.push(id)
        localStorage.setItem('projectHistoryList', JSON.stringify(list))
    },
    deleteHistory(id){
        let list = this.getHistoryList()
        for (let i = 0; i < list.length; i++) {
            if(list[i].id === id){
                list.splice(i,1)
                break
            }
        }
        localStorage.setItem('projectHistoryList', JSON.stringify(list))
    },
    editHistory(id){
        let list = this.getHistoryList()
        for (let i = 0; i < list.length; i++) {
            if(list[i].id === id){
                list.splice(i,1)
                list.unShift(id)
                return
            }
        }
        this.addHistory(id)
    },
    getHistoryList(){
        let list = localStorage.getItem('projectHistoryList')
        if(list){
            list = JSON.parse(list)
        }else{
            list = []
        }
        return list
    }
}