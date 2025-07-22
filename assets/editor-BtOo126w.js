import{_ as i,d as l,s as m,C as d,c,o as u,b as _}from"./index-CYwpIJ_g.js";import{u as p}from"./xslt.store-CM0jIeSs.js";import{P as h}from"./prismeditor.esm-Ba3TzS2K.js";/* empty css                        */import{p as s}from"./prism-core-g1SSaHIL.js";import"./prism-markup-Bufj6vtu.js";import{b as r}from"./index-BYyg8C7N.js";const f=l({el:"#app",mixins:[],emits:["formatComplete"],props:{formatCode:{type:Boolean,required:!0}},components:{PrismEditor:h},data(){return{}},mounted:function(){this.current_model.xslt_data===""&&this.addExampleCode()},unmounted:function(){},watch:{formatCode(t){t&&this.initFormatting()}},methods:{isJSON(){const t=this.current_model.xslt_data.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")},initFormatting(){if(this.isJSON()){this.formatJsonCode();return}this.formatXmlCode()},formatJsonCode(){try{this.current_model.xslt_data=r.js(this.current_model.xslt_data,{...this.formatOptions}),this.$emit("formatComplete",!1)}catch(t){logError("Error formatting JSON code:",t)}},formatXmlCode(){try{this.current_model.xslt_data=r.html(this.current_model.xslt_data,{...this.formatOptions}),this.$emit("formatComplete",!1)}catch(t){logError("Error formatting XML code:",t)}},highlighter(t){return s.highlight(t,s.languages.markup,"markup")},addExampleCode(){this.current_model.xslt_data=`
<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="xml" />
    <xsl:strip-space elements="*" />

    <xsl:template match="/document">
    <dokument>
        <filename><xsl:value-of select="filename" /></filename>
        <basic_info>
            <invoice_number><xsl:value-of select="fields_compact/invoice_id" /></invoice_number>
            <date><xsl:value-of select="fields_compact/invoice_date" /></date>
        </basic_info>
        <amounts>
            <net_amount><xsl:value-of select="fields_compact/net_amount" /></net_amount>
            <total_amount><xsl:value-of select="fields_compact/total_amount" /></total_amount>
        </amounts>
    </dokument>


    </xsl:template>

</xsl:stylesheet>`}},setup(){const t=p(),{current_model:e,isReadOnly:o}=m(t);return{current_model:e,isReadOnly:o,formatOptions:{indent_size:4,indent_char:" ",eol:`
`,end_with_newline:!1,preserve_newlines:!0,max_preserve_newlines:2,indent_inner_html:!0,wrap_line_length:0,unformatted:[],extra_liners:[]}}}}),x={id:"app"};function g(t,e,o,v,C,w){const a=d("prism-editor");return u(),c("div",x,[_(a,{class:"special-rules-editor",modelValue:this.current_model.xslt_data,"onUpdate:modelValue":e[0]||(e[0]=n=>this.current_model.xslt_data=n),highlight:t.highlighter,"line-numbers":"",tabSize:4,readonly:t.isReadOnly},null,8,["modelValue","highlight","readonly"])])}const J=i(f,[["render",g],["__scopeId","data-v-9a5712a6"]]);export{J as e};
