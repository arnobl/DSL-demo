package fr.insa.exp.ui.coloring;

import org.eclipse.xtext.RuleCall;
import org.eclipse.xtext.ide.editor.syntaxcoloring.IHighlightedPositionAcceptor;
import org.eclipse.xtext.ide.editor.syntaxcoloring.ISemanticHighlightingCalculator;
import org.eclipse.xtext.nodemodel.INode;
import org.eclipse.xtext.resource.XtextResource;
import org.eclipse.xtext.util.CancelIndicator;

public class ExpSemanticHighlightingCalculator implements ISemanticHighlightingCalculator {
	@Override
	public void provideHighlightingFor(XtextResource resource, IHighlightedPositionAcceptor acceptor, CancelIndicator cancelIndicator) {
		if (resource == null || resource.getParseResult() == null) {
			return;
		}

		// Getting the result of the parsing (this is not the model)
		final INode root = resource.getParseResult().getRootNode();
		for (INode node : root.getAsTreeIterable()) {

			// useless example: changing the style of Add elements
			// To do so, we do not access the model but the parsed grammar:
			// Checking that the current element is a call to a rule
			if ((node.getGrammarElement() instanceof RuleCall)) {
				final RuleCall call = (RuleCall) node.getGrammarElement();

				// Checking that the name of the called rule is 'Add'
				if (call.getRule().getName().equals("Add")) {
					// Changing the style of the element in the editor.
					// That using the style defined in the ExpHighlightingConfiguration class
					acceptor.addPosition(node.getOffset(), node.getLength(), ExpHighlightingConfiguration.ADD);
				}
			}

		}
	}
}
