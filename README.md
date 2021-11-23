
# Xtext in practices

This language defines arithmetical expressions (prefix notation) that can use constant values.
Example:
```
val foo := 1
val bar := 2

+ 1 * bar bar
```


The grammar is here:

[`fr.insa.exp/src/fr/insa/exp/Exp.xtext`](/fr.insa.exp/src/fr/insa/exp/Exp.xtext)

The validator that checks the arithmetical expression is correct is here:

[`fr.insa.exp/src/fr/insa/exp/validation/ExpValidator.java`](/fr.insa.exp/src/fr/insa/exp/validation/ExpValidator.java)

The generator that writes in a file the result of the expression:

[`fr.insa.exp/src/fr/insa/exp/generator/ExpGenerator.xtend`](/fr.insa.exp/src/fr/insa/exp/generator/ExpGenerator.xtend)

The unit tests that test the grammar:

[`fr.insa.exp.tests/src/fr/insa/exp/tests/ExpParsingTest.xtend`](/fr.insa.exp.tests/src/fr/insa/exp/tests/ExpParsingTest.xtend)

The customised outline:

[`fr.insa.exp.ui/src/fr/insa/exp/ui/outline/ExpOutlineTreeProvider.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/outline/ExpOutlineTreeProvider.java)

The quick-fix features:

[`fr.insa.exp.ui/src/fr/insa/exp/ui/quickfix/ExpQuickfixProvider.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/quickfix/ExpQuickfixProvider.java)

The content assist features:

[`fr.insa.exp.ui/src/fr/insa/exp/ui/contentassist/ExpProposalProvider.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/contentassist/ExpProposalProvider.java)

Setting the keywords colour:

[`fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java)

[`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java) (to create)

Semantic highlighting:

[`fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java)

[`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpSemanticHighlightingCalculator.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpSemanticHighlightingCalculator.java) (to create)

[`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java`](/fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java)


Manual cross-reference (scoping):

[`fr.insa.exp/src/fr/insa/exp/scoping/ExpScopeProvider.java`](/fr.insa.exp/src/fr/insa/exp/scoping/ExpScopeProvider.java)



# Tips and tricks

## How to access the root object of my model?

```java
EObject rootElement = EcoreUtil2.getRootContainer(myModelElement);
```


## How to get all the instances of a given type contained in my model?

```java
// Getting the root of the model
EObject rootElement = EcoreUtil2.getRootContainer(myModelElement);
// Getting all the instances of MyModelObjectType in the model
List<MyModelObjectType> objects = EcoreUtil2.getAllContentsOfType(rootElement, MyModelObjectType.class);
```

## Why my Xtext grammar rule does not generate a class?

`MyRule: 'mytoken';`

In this example Xtext optimises the grammar: since `MyRule` contains tokens only (ie no rule access), it considers `MyRule` as a terminal (ie a lexer rule) and does not create a class `MyRule`.

To force the class creation, you have to write that:

`MyRule returns MyRule: 'mytoken';`

where `returns` precise the name of the class to instantiate (this class does not exist yet, it is Xtext that generate it in the `src-gen` folder).



