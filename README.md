
# Xtext in practices

This language defines arithmetical expressions (prefix notation) that can use constant values.
Example:
```
val foo := 1
val bar := 2

+ 1 * bar bar
```


The grammar is here:

`fr.insa.exp/src/fr/insa/exp/Exp.xtext`

The validator that checks the arithmetical expression is correct is here:

`fr.insa.exp/src/fr/insa/exp/validation/ExpValidator.java`

The generator that writes in a file the result of the expression:

`fr.insa.exp/src/fr/insa/exp/generator/ExpGenerator.xtend`

The unit tests that test the grammar:

`fr.insa.exp.tests/src/fr/insa/exp/tests/ExpParsingTest.xtend`

The customised outline:

`fr.insa.exp.ui/src/fr/insa/exp/ui/outline/ExpOutlineTreeProvider.java`

The quick-fix features:

`fr.insa.exp.ui/src/fr/insa/exp/ui/quickfix/ExpQuickfixProvider.java`

The content assist features:

`fr.insa.exp.ui/src/fr/insa/exp/ui/contentassist/ExpProposalProvider.java`

Setting the keywords colour:

`fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java`

`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java` (to create)

Semantic highlighting:

`fr.insa.exp.ui/src/fr/insa/exp/ui/ExpUiModule.java`

`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpSemanticHighlightingCalculator.java` (to create)

`fr.insa.exp.ui/src/fr/insa/exp/ui/coloring/ExpHighlightingConfiguration.java`


Manual cross-reference (scoping):

`fr.insa.exp/src/fr/insa/exp/scoping/ExpScopeProvider.java`



# Tips and tricks

How to access the root object of my model?

```java
EObject rootElement = EcoreUtil2.getRootContainer(myModelElement);
```


How to get all the instances of a given type contained in my model?

```java
// Getting the root of the model
EObject rootElement = EcoreUtil2.getRootContainer(myModelElement);
// Getting all the instances of MyModelObjectType in the model
List<MyModelObjectType> objects = EcoreUtil2.getAllContentsOfType(rootElement, MyModelObjectType.class);
```
