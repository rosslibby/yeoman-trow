const Generator = require('yeoman-generator')

const columns = []
module.exports = class extends Generator {
    columns () {
        return this.prompt([
            {
                type: 'input',
                name: 'heading',
                message: 'Enter the heading'
            },
            {
                type: 'input',
                name: 'key',
                message: 'Enter the object key'
            },
            {
                type: 'list',
                choices: [
                    'Text',
                    'Link',
                    'Progress bar',
                    'Audio player'
                ],
                name: 'type',
                message: 'Field type'
            },
            {
                type: 'confirm',
                name: 'finished',
                message: 'Do you need to add another column?',
                default: true
            }
        ]).then((answers) => {
            const { finished, heading, key, type } = answers
            let obj = {
                children: key,
                type,
                props: {
                    heading
                }
            }

            if (type === 'Link')
                obj.props.link = (context, text) => createLink(context, text)

            columns.push(obj)

            if (finished)
                return this.columns()

            console.log('[')
            columns.forEach((column, i) => {
                const comma = i === columns.length - 1
                    ? ''
                    : ','

                console.log(`    {`)
                console.log(`        children: '${column.children}',`)
                console.log(`        type: '${column.type}',`)
                console.log(`        props: {`)
                console.log(`            heading: '${column.props.heading}${typeof column.props.link !== 'undefined' ? ',' : ''}'`)
                if (typeof column.props.link !== 'undefined')
                    console.log(`            link: ${column.props.link}`)
                console.log(`        }`)
                console.log(`    }${comma}`)
            })
            console.log(']')
        })
    }
}