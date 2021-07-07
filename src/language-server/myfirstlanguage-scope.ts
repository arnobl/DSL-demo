/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

 import {  AstNode, AstNodeDescription,  AstReflection, EMPTY_SCOPE, getDocument,  LangiumDocument,  LangiumServices, PrecomputedScopes, Scope,  ScopeProvider,  SimpleScope,  stream, Stream, streamAllContents } from 'langium';
import { Val  } from './generated/ast';
/*export class MyFirstLanguageScopeComputation extends DefaultScopeComputation {

    constructor(services: LangiumServices) {
        super(services);
    }

    computeScope(document: LangiumDocument): PrecomputedScopes {

        console.log( document.parseResult?.value)

//        const model = document.parseResult?.value as Domainmodel;
        const scopes = new Map();
//        this.processContainer(model, scopes, document);
        return scopes;
    }

/*    protected processContainer(container: Domainmodel | PackageDeclaration, scopes: PrecomputedScopes, document: LangiumDocument): AstNodeDescription[] {
        const localDescriptions: AstNodeDescription[] = [];
        for (const element of container.elements) {
        }
        scopes.set(container, localDescriptions);
        return localDescriptions;
    }*/

/*    protected createQualifiedDescription(pack: PackageDeclaration, description: AstNodeDescription, document: LangiumDocument): AstNodeDescription {
        const name = pack.name + '.' + description.name;
        return this.createDescription(description.node!, name, document);
    }*/

/*}*/




export class MyFirstLanguageScopeProvider implements ScopeProvider {
    protected readonly reflection: AstReflection;

    constructor(services: LangiumServices) {
        this.reflection = services.AstReflection;
    }

    getScope(node: AstNode, referenceId: string): Scope {
        const precomputed = this.computeScope(getDocument(node));
        if (!precomputed) {
            return EMPTY_SCOPE;
        }
        const referenceType = this.reflection.getReferenceType(referenceId);

        let currentNode: AstNode | undefined = node;
        const scopes: Array<Stream<AstNodeDescription>> = [];
        do {
            const allDescriptions = precomputed.get(currentNode);
            if (allDescriptions) {
                scopes.push(stream(allDescriptions).filter(
                    desc => this.reflection.isSubtype(desc.type, referenceType)));
            }
            currentNode = currentNode.$container;
        } while (currentNode);

        // TODO use the global scope (index) as outermost scope
        let result: Scope = EMPTY_SCOPE;
        for (let i = scopes.length - 1; i >= 0; i--) {
            result = new SimpleScope(scopes[i], result);
        }
        return result;
    }


    computeScope(document: LangiumDocument): PrecomputedScopes {
        const rootNode = document.parseResult?.value;
        const scopes = new Map();
        if (!rootNode) {
            return scopes;
        }
        streamAllContents(rootNode).forEach(content => {
            const { node } = content;
            const container = node.$container;
            if (container) {
                if (node)
                if (this.reflection.isInstance(node, "Val")) {
                    const v = node as Val
                    const name = v.nameVal;
                    const description = this.createDescription(node, name, document);
                    this.addToContainer(description, container, scopes);
                }
            }
        });
        return scopes;
    }

    protected createDescription(node: AstNode, name: string, document: LangiumDocument): AstNodeDescription {
        return {
            node,
            name,
            type: node.$type,
            documentUri: document.uri
        };
    }

    protected addToContainer(description: AstNodeDescription, container: AstNode, scopes: PrecomputedScopes): void {
        if (scopes.has(container)) {
            scopes.get(container)?.push(description);
        } else {
            scopes.set(container, [description]);
        }
    }


}

