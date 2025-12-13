import networkx as nx

def build_cyber_graph():
    G = nx.Graph()

    edges = [
        ("+91111", "+92222"),
        ("+91111", "+93333"),
        ("+92222", "+94444"),
        ("+93333", "+95555"),
        ("+91111", "+96666"),
    ]

    G.add_edges_from(edges)

    pagerank = nx.pagerank(G)
    kingpins = set(sorted(pagerank, key=pagerank.get, reverse=True)[:1])

    elements = []

    for node in G.nodes():
        elements.append({
            "data": {
                "id": node,
                "label": node,
                "score": pagerank[node]
            },
            "classes": "kingpin" if node in kingpins else "normal"
        })

    for src, tgt in G.edges():
        elements.append({
            "data": {
                "source": src,
                "target": tgt
            }
        })

    return {
        "elements": elements,
        "summary": {
            "total_nodes": G.number_of_nodes(),
            "total_edges": G.number_of_edges(),
            "kingpins": list(kingpins)
        }
    }
