/*
 * generated by Xtext 2.23.0
 */
package fr.insa.exp.tests

import com.google.inject.Inject
import fr.insa.exp.exp.ExpArithm
import fr.insa.exp.exp.ExpPackage
import fr.insa.exp.validation.ExpValidator
import java.util.stream.Stream
import org.eclipse.xtext.diagnostics.Diagnostic
import org.eclipse.xtext.testing.InjectWith
import org.eclipse.xtext.testing.extensions.InjectionExtension
import org.eclipse.xtext.testing.util.ParseHelper
import org.eclipse.xtext.testing.validation.ValidationTestHelper
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.^extension.ExtendWith
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource

@ExtendWith(InjectionExtension)
@InjectWith(ExpInjectorProvider)
class ExpParsingTest {
	@Inject
	ParseHelper<ExpArithm> parseHelper
	@Inject 
	extension ValidationTestHelper
	ExpArithm result;
	
	def static Stream<String> goodLanguageSequences() {
		return Stream.of(
		"+ 1 1", 
		"+ 1.12 1", 
		"* 2 9", 
		"* 2 9.62",
		"- 8.65 9.62",
		"/ 0 12",
		"/ 4 + 1 - * 8 9 + 5 5",
		'''val foo := 1
		+ foo foo'''
		);
	}
	
	@ParameterizedTest
	@MethodSource("goodLanguageSequences")
	def void testSequences(String seq) {
		result = parseHelper.parse(seq)
		Assertions.assertNotNull(result)
		result.assertNoIssues
	}
	
	@Test
	def void testDivZero() {
		result = parseHelper.parse('''
			/ 12 0
		''')
	    result.assertError(ExpPackage.Literals.DIV, ExpValidator.DIV_0)
	}
	
	@Test
	def void testDivZeroWithVal() {
		result = parseHelper.parse('''
			val a := 0
			/ 12 a
		''')
	    result.assertError(ExpPackage.Literals.DIV, ExpValidator.DIV_0)
	}
	
	@Test
	def void testValNotUsed() {
		result = parseHelper.parse('''
		val foo := 1
		+ 1 2
		''')
		Assertions.assertNotNull(result)
		result.assertNoErrors
		result.assertWarning(ExpPackage.Literals.VAL, ExpValidator.NOT_USED)
	}
	
	@Test
	def void testValRefKO() {
		result = parseHelper.parse('''
		val bar := 1
		+ foo bar
		''')
		
		result.assertError(ExpPackage.Literals.VAL_REF, Diagnostic.LINKING_DIAGNOSTIC)
	}
	
	@Test
	def void testValDuplicated() {
		result = parseHelper.parse('''
		val bar := 1
		val bar := 2
		+ 1 bar
		''')
		
		result.assertError(ExpPackage.Literals.VAL, ExpValidator.VAL_DUP)
	}
}