package fr.insa.exp.ui.coloring;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.xtext.ui.editor.syntaxcoloring.DefaultHighlightingConfiguration;
import org.eclipse.xtext.ui.editor.syntaxcoloring.IHighlightingConfigurationAcceptor;
import org.eclipse.xtext.ui.editor.utils.TextStyle;

public class ExpHighlightingConfiguration extends DefaultHighlightingConfiguration {
	public final static String ADD = "Add";

	public void configure(IHighlightingConfigurationAcceptor acceptor) {
		super.configure(acceptor);

		// Registering a style for Add elements (used in the semantic highlighting 
		acceptor.acceptDefaultHighlighting(ADD, "Add", crossAddTextStyle());
	}

	// Defining a style of Add elements
	public TextStyle crossAddTextStyle() {
		TextStyle textStyle = new TextStyle();
		textStyle.setStyle(SWT.ITALIC);
		return textStyle;
	}

	// Just changing the style of all the keywords
	public TextStyle keywordTextStyle() {
		TextStyle textStyle = new TextStyle();
		textStyle.setColor(new RGB(120, 50, 240));
		textStyle.setStyle(SWT.BOLD);
		return textStyle;
	}
}
