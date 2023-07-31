document.addEventListener('DOMContentLoaded', () => {
    const buttonProccess = document.getElementById('transform-button')

    buttonProccess.addEventListener('click', () => {
        const textAreaOldContent = document.getElementById('textareaold')
        const textAreaNewContent = document.getElementById('textareanew')

        let content = textAreaOldContent.value.split('\n');

        const namespacePosition = findNamespace(content)

        console.log(namespacePosition)

        const firstBracketPosition = content.indexOf('{');
        const lastBracketPosition = content.lastIndexOf('}');

        content[namespacePosition] = `${content[namespacePosition]};`;

        content.splice(firstBracketPosition, 1, '');
        content.splice(lastBracketPosition - 1, 1);

        textAreaNewContent.value = content.join('\n');
    });
});

const findNamespace = (value) => {
    let result = -1;

    for (let index = 0; index < value.length; index++) {
        const results = value[index].split(' ')

        const position = results.indexOf('namespace')

        if (position !== -1) 
        {
            result = index
            break;
        }
    }

    return result;
}


document.addEventListener('DOMContentLoaded', () => {

    const div = document.getElementById('paste-content');
    const textAreaOldContent = document.getElementById('textareaold')

    div.addEventListener('click', () => {
        navigator.clipboard
            .readText()
            .then(
                cliptext =>
                    (textAreaOldContent.value = cliptext),
                    err => console.log(err)
            );
    });
})

const copyButton = document.getElementById('copy-content');
const textAreaNewContent = document.getElementById('textareanew')

  copyButton.addEventListener('click', () => {
      navigator.clipboard
          .writeText(textAreaNewContent.value)
          .then(
              success => console.log("text copied"), 
              err => console.log("error copying text")
          );
  });

document.addEventListener('DOMContentLoaded', () => {
    const buttonExample = document.getElementById('paste-example')

    buttonExample.addEventListener('click', () => {
        const textAreaOldContent = document.getElementById('textareaold')

        textAreaOldContent.value = 'namespace Example.Namespace\n\n{\n    public static class BooleanExtensions\n    {\n        public static bool ToBoolean(this string stringBoolean)\n        {\n            return stringBoolean == "1";\n        }\n        public static bool ToBoolean(this int intBool)\n        {\n            return intBool == 1;\n        }\n\n        public static bool? ToNullableBoolean(this int intBool)\n        {\n            bool? nullableBool = intBool == 1;\n            return nullableBool;\n        }\n    }\n}\n'
        
        const buttonProccess = document.getElementById('transform-button')

        buttonProccess.click();
    });
});