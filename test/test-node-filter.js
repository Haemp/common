const treeFilter = require('../tree-filter');

const tests = {

    filterOnEndNode(){
        const data = {
            title: 'Foo',
            children: [{ title: 'Bar', children: [{ title: 'Baz' }] }]
        };
        
        const filteredData = treeFilter({node: data, childrenKey: 'children', filterFunc: (node) => {
            return node.title === 'Baz';
        }})
        
        console.log('Filtered data should be the same as pre-filtered data', JSON.stringify(filteredData) === JSON.stringify(data));
    },

    filterOnTopNode(){
        const data = {
            title: 'Foo',
            children: [{ title: 'Bar', children: [{ title: 'Baz' }] }]
        };
        const expectedFilter = {
            title: 'Foo',
            children: []
        }
        const filteredData = treeFilter({node: data, childrenKey: 'children', filterFunc: (node) => {
            return node.title === 'Foo';
        }})

        
        console.log('Filtered data should only contain the top node', JSON.stringify(filteredData) === JSON.stringify(expectedFilter));
    }
}

Object.values(tests).forEach(test => {
    test()
})
