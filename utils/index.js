export const cssHelper = {
    flex: {
        display: 'flex',
    },
    col: {
        flexDirection: 'column',
    },
    between: {
        justifyContent: 'space-between'
    },
    around: {
        justifyContent: 'space-around'
    },
    alignCenter: {
        alignItems: 'center',
    }
};

export const sort = (array,by) => {
    switch (by) {
        case 'date':
            return array.sort((first, second) => {
                const firstDate = new Date(first.createdAt);
                const secondDate = new Date(second.createdAt);
                return firstDate> secondDate ? -1 : 1;
            })
       case 'oldDate':
           return array.sort((first, second) => {
               const firstDate = new Date(first.createdAt);
               const secondDate = new Date(second.createdAt);
               return firstDate < secondDate ? -1 : 11;
           })
       case 'name':
          
           return array.sort((first, second) => {
               return first.name > second.name ? 1 : -1;
           })
       case 'name':
          
           return array.sort()
       case 'quantity':
           
           return array.filter(each => parseInt(each.quantity, 10) === 0)
        default:
           
           return array.sort();
    }
}