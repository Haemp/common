const override = require('../override-class-noop');
const RETURN = 'example-return';
class ExampleClass{
    exampleMethod(){
        return RETURN;
    }
}
const obj = new ExampleClass();
console.log('Example class return should be '+RETURN+' -', obj.exampleMethod() === RETURN);

const OverWrittenExample = override(ExampleClass);
const overwrittenObj = new OverWrittenExample()
console.log('Overwritten class return should be undefined -', overwrittenObj.exampleMethod() === undefined);