"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";
import { usePDF, Resolution, Margin } from "react-to-pdf";
import { format } from "date-fns";

export default function DocumentPreview() {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const { toPDF, targetRef } = usePDF({
    filename: "lease-agreement.pdf",
    // method: "open",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    // resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      // orientation: "landscape",
    },
    // canvas: {
    //   // default is 'image/jpeg' for better size performance
    //   mimeType: "image/png",
    //   qualityRatio: 1,
    // },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    // overrides: {
    //   // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    //   pdf: {
    //     compress: true,
    //   },
    //   // see https://html2canvas.hertzen.com/configuration for more options
    //   canvas: {
    //     useCORS: true,
    //   },
    // },
  });

  return (
    <div className="w-1/2 px-8 py-6 bg-gray-100">
      <div className="flex justify-end">
        <button
          id="export-button"
          className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
          onClick={() => toPDF()}
        >
          Export
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        <div className="my-4 select-none max-h-full">
          <div
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "14px",
              flexDirection: "column",
              display: "flex",
              margin: "0 auto !important",
              lineHeight: "17px",
              width: "100%",
              padding: "30px 30px",
            }}
            className="bg-[#fff] border border-gray-200 px-4 py-5 shadow-sm w-full"
          >
            <div
              style={{
                margin: "0 auto !important",
              }}
              ref={targetRef}
            >
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "21px",
                  fontStyle: "italic",
                  fontWeight: "400",
                }}
                className="pb-8"
              >
                Residential Lease Agreement
              </h1>
              <p className="pb-4" style={{ textIndent: "32px" }}>
                This Lease Agreement (hereinafter referred to as the "Agreement" or the
                "Lease") is entered into on{" "}
                {formValues["lease_date"]?.value &&
                  renderDocumentField(format(formValues["lease_date"]?.value, "MMMM d, yyyy"))}
                , by and between {renderDocumentField(formValues["landlord_name"]?.value)}
                {"  "}
                (hereinafter referred to as "Landlord") and{" "}
                {renderDocumentField(formValues["tenant_name"]?.value)}
                {formValues["is_second_tenant"]?.value === "true" &&
                  renderDocumentField(`, ${formValues["second_tenant_name"]?.value}`)}
                {formValues["is_third_tenant"]?.value === "true" &&
                  renderDocumentField(`, ${formValues["third_tenant_name"]?.value}`)}{" "}
                (hereinafter referred to as "Tenant"). No other tenants are allowed without the
                written consent of the Landlord, or the execution of a new lease agreement.
                This Agreement establishes the terms and conditions under which the Landlord
                agrees to lease the designated property to the Tenant, and both parties
                willingly enter into this contract with the intention of upholding its terms.
              </p>
              <p className="pb-4">
                DESCRIPTION OF PROPERTY: The Landlord agrees to lease to the Tenant the
                residential premises located at{" "}
                {renderDocumentField(formValues["property_address"]?.value)},{" "}
                {formValues["property_unit"]?.value &&
                  ` ${renderDocumentField(formValues["property_unit"]?.value)}, `}
                {renderDocumentField(formValues["property_city"]?.value)},{" "}
                {renderDocumentField(formValues["property_state"]?.value)},{" "}
                {renderDocumentField(formValues["property_zip"]?.value)} in{" "}
                {renderDocumentField(formValues["property_county"]?.value)} County (hereinafter
                referred to as the "Property").{" "}
                {formValues["is_furniture_included"]?.value === "true"
                  ? `Included within this lease are any furnishings and appliances provided by the Landlord, which are as follows: ${renderDocumentField(formValues["list_of_furniture"]?.value)}. The Tenant acknowledges receipt of these items and agrees to maintain them in good condition throughout the duration of the lease.`
                  : null}
              </p>
              <p className="pb-4">
                DURATION OF LEASE: The lease term shall commence on{" "}
                {formValues["start_date"]?.value &&
                  renderDocumentField(
                    format(formValues["start_date"]?.value, "MMMM d, yyyy")
                  )}{" "}
                and will continue in effect until{" "}
                {formValues["end_date"]?.value &&
                  renderDocumentField(format(formValues["end_date"]?.value, "MMMM d, yyyy"))}
                , unless otherwise terminated earlier in accordance with the provisions set
                forth in this Agreement. The Tenant shall vacate the premises upon the
                expiration of the lease unless a renewal agreement is reached between both
                parties. the Landlord accepts further rent from the Tenant (other than past due
                rent), in which case a month-to-month tenancy shall be created which either
                party may terminate by a thirty (30) day written notice. In the event a
                month-to-month tenancy results, rent shall be at a rate agreed to by the
                Landlord and the Tenant, or as allowed by law; all other terms and conditions
                of this Agreement shall remain in full force and effect.
              </p>
              <p className="pb-4">
                RENTAL PAYMENTS: The Tenant agrees to compensate the Landlord with a monthly
                rental payment of{" "}
                {renderDocumentField(formValues["monthly_rent_payment"]?.value)}. All rent
                payments due under this Agreement shall be made directly to the Landlord at
                Landlord's address listed here:{" "}
                {renderDocumentField(formValues["rent_payment_address"]?.value)},{" "}
                {formValues["rent_payment_unit"]?.value &&
                  ` ${renderDocumentField(formValues["rent_payment_unit"]?.value)}, `}
                {renderDocumentField(formValues["rent_payment_city"]?.value)},{" "}
                {renderDocumentField(formValues["rent_payment_zip"]?.value)} or any other
                location subsequently specified by the Landlord in writing to the Tenant, on or
                before its due date and without demand. This payment is due on the of each
                month. Failure to pay rent in a timely manner may result in penalties or
                further action as outlined in this Agreement.
              </p>
              {formValues["is_security_deposit"]?.value === "true" && (
                <p className="pb-4">
                  SECURITY DEPOSIT REQUIREMENTS: The Tenant shall provide a security deposit in
                  the amount of {renderDocumentField(formValues["security_deposit"]?.value)} at
                  the commencement of this lease. This deposit is intended to cover any
                  potential damages to the Property, unpaid rent, or breaches of this
                  Agreement. The return of a Security Deposit shall occur within 21 days after
                  the Tenant vacates the Premises.
                </p>
              )}
              <p className="pb-4">
                UTILITIES AND SERVICES: The responsibility for utility and service payments
                shall be divided as follows: The Tenant shall be responsible for covering the
                costs of: {renderDocumentField(formValues["tenant_utilities"]?.value)}. The
                Landlord shall be responsible for covering the costs of:{" "}
                {renderDocumentField(formValues["landlord_utilities"]?.value)}. The Tenant
                agrees to ensure that all utility accounts for which they are responsible
                remain in good standing throughout the lease term.
              </p>
              <p className="pb-4">
                PERMITTED USE OF PROPERTY: The Tenant agrees to use the Property solely as a
                private residence. The Tenant shall not engage in any illegal activities on the
                premises, nor shall they create disturbances that could negatively impact
                neighbors or violate local laws and regulations. The Tenant shall also comply
                with any community rules or homeowners' association guidelines that may apply.
              </p>
              <p className="pb-4">
                MAINTENANCE, REPAIRS, AND RESPONSIBILITIES: The Tenant agrees to keep the
                Property clean, safe, and in good condition throughout the lease term. Any
                damages beyond normal wear and tear shall be repaired at the Tenant's expense.
                The Landlord remains responsible for structural maintenance and repairs related
                to the building's major systems, unless the need for such repairs arises due to
                negligence or misuse by the Tenant.
              </p>
              <p className="pb-4">
                ACCESS TO THE PROPERTY: The Landlord reserves the right to enter the Property
                for the purposes of inspections, repairs, or in cases of emergency. Except in
                urgent situations, the Landlord shall provide the Tenant with at least 24-hour
                advance notice before entering the premises.
              </p>
              {formValues["are_pets_allowed"]?.value === "true" ? (
                <p className="pb-4">
                  PET POLICY: Pets are allowed with prior written approval from the Landlord
                  and an additional deposit of{" "}
                  {renderDocumentField(formValues["pet_deposit"]?.value)}. If permitted, the
                  Tenant shall ensure that their pets do not cause damage to the Property or
                  create disturbances.
                </p>
              ) : (
                <p className="pb-4">
                  PET POLICY: Pets are not permitted on the premises under any circumstances.
                </p>
              )}
              <p className="pb-4">
                SUBLETTING AND LEASE ASSIGNMENT: The Tenant shall not sublease the Property or
                assign their lease rights to another party without obtaining prior written
                consent from the Landlord.
              </p>
              <p className="pb-4">
                USE OF THE PREMISES: The Premises shall be used and occupied by the Tenant and
                the Tenant's immediate family, consisting of{" "}
                {renderDocumentField(formValues["people_living_on_property"]?.value)} people,
                exclusively, and no part of the Premises shall be used at any time during the
                term of this Agreement by the Tenant for the purpose of carrying on any
                business, profession, or trade of any kind, or for any purpose other than as a
                private residential dwelling. The Tenant shall not allow any other person,
                other than Tenant's immediate family or transient relatives and friends who are
                guests of the Tenant, to use or occupy the Premises without first obtaining the
                Landlord's written consent to such use. The Tenant shall comply with any and
                all laws, ordinances, rules and orders of any and all governmental or
                quasi-governmental authorities affecting the cleanliness, use, occupancy and
                preservation of the Premises.
                <br />
                Any additions to the household members named on this Lease, including live-in
                aides and foster children, but excluding natural births, require the advance
                written approval of the Landlord.
              </p>
              <p className="pb-4">
                BREACH OF AGREEMENT AND TERMINATION: The Landlord must give the Tenant a notice
                that specifies the grounds for termination of the tenancy. The notice of
                grounds must be given at or before commencement of any eviction action. The
                notice of grounds may be included in, or may be combined with, any eviction
                notice to the Tenant. The Landlord's eviction notice means a notice to vacate,
                or a complaint used under State or local law to commence an eviction action.
                The Landlord may only evict the Tenant from the Premises by instituting a court
                action.
              </p>
              <p className="pb-4">
                LATE CHARGE: The Tenant acknowledges that late payment of Rent may cause
                Landlord to incur costs and expenses, the exact amount of which is extremely
                difficult and impractical to determine. These costs may include but are not
                limited to: processing, enforcement, accounting expenses and late charges
                imposed on the Landlord. Partial payments are not accepted. In the event that
                any payment required to be paid by Tenant hereunder is not made within{" "}
                {renderDocumentField(formValues["late_fee_grace_period"]?.value)} days after it
                is due, the Tenant shall pay to the Landlord, in addition to such payment or
                other charges due hereunder, a "late fee" in the amount of{" "}
                {renderDocumentField(formValues["late_fee"]?.value)}. Late fees are deemed
                additional Rent.
              </p>
              <p className="pb-4">
                Indemnification: The Landlord shall not be liable for any damage or injury of
                or to the Tenant, Tenant's family, guests, invitees, agents or employees or to
                any person entering the Premises or the building of which the Premises are a
                part or to goods or equipment, or in the structure or equipment of the
                structure of which the Premises are a part, and the Tenant hereby agrees to
                indemnify, defend and hold the Landlord harmless from any and all claims or
                assertions of every kind and nature relating to same.
              </p>
              <p className="pb-4">
                Neighborhood Conditions: The Tenant is advised to seek information as to the
                neighborhood or area conditions, including: schools, proximity and adequacy of
                law enforcement, crime statistics, proximity of registered felons or offenders,
                fire protection, other governmental services, availability, adequacy and cost
                of any speed-wired, wireless internet connections or other telecommunications
                or other technology services and installations, proximity to commercial,
                industrial or agricultural activities, existing and proposed transportation,
                construction and development that may affect noise, view, or traffic, airport
                noise, noise or odor from any source, wild and domestic animals, other
                nuisances, hazards, or circumstances, cemeteries, facilities and condition of
                common areas, conditions and influences of significance to certain cultures
                and/or religions, and personal needs, requirements and preferences of Tenant.
                The Tenant's dissatisfaction with any of these issues shall in no way be a
                valid reason for terminating this Agreement or failing to make the necessary
                rental payments.
              </p>
              <p className="pb-4">
                Improvements & Alterations: The Tenant shall make no alterations to the
                buildings or improvements on the Premises or construct any building or make any
                other improvements on the Premises without the prior written consent of the
                Landlord. Any and all alterations, changes, and/or improvements built,
                constructed or placed on the Premises by the Tenant shall, unless otherwise
                provided by written agreement between the Landlord and the Tenant, be and
                become the property of the Landlord and remain on the Premises at the
                expiration or early termination of this Agreement. Should the Tenant fail to
                obtain the Landlord's written consent for such alterations or improvements,
                then the Landlord may charge the Tenant for restoration of the Premises to the
                condition it was in prior to any alterations or improvements. The Tenant shall
                not be allowed to make any repairs, alterations, or improvements in or about
                the Premises including but not limited to: painting, wallpapering, adding or
                changing locks, installing antenna or satellite dish(es), placing signs,
                displays or exhibits, or using screws, fastening devices, large nails or
                adhesive materials. The Landlord shall not be responsible for costs of
                alterations or repairs made by the Tenant, and the Tenant shall not be allowed
                to deduct from the Rent the costs of any such repairs, alterations or
                improvements done without the Landlord's consent. Any unilateral deduction made
                by the Tenant shall be considered unpaid Rent.
              </p>
              {formValues["was_property_built_before_1978"]?.value === "true" && (
                <p className="pb-4">
                  Lead-Based Paint Disclosure: This property was built before 1978. Housing
                  built before 1978 may contain lead-based paint. Lead paint, paint chips and
                  dust can cause health hazards if not managed properly. Lead exposure is
                  especially harmful to young children and pregnant women. Before renting
                  pre-1978 housing, landlords must disclose the presence of lead-based paint
                  hazards in the dwelling. Renters must also receive a federally-approved
                  pamphlet on lead poisoning prevention. The Landlord has no knowledge
                  regarding the presence of lead- based paint on the Premises.
                </p>
              )}
              <p className="pb-4">
                LEGAL JURISDICTION: This Agreement shall be interpreted and enforced in
                accordance with the laws of the state of{" "}
                {renderDocumentField(formValues["property_state"]?.value)}. Any disputes
                arising from this Agreement shall be resolved in the appropriate legal
                jurisdiction within said state.
              </p>
              <p className="pb-4">
                IN WITNESS WHEREOF, the Landlord and the Tenant have affixed their signatures
                to this Agreement on the date first stated above.
              </p>
              <div className="pb-4">
                <p>LANDLORD: __________________________</p>
                <p>{renderDocumentField(formValues["landlord_name"]?.value)}</p>
              </div>
              <div className="pb-4">
                <p>TENANT: __________________________</p>
                <p>{renderDocumentField(formValues["tenant_name"]?.value)}</p>
              </div>
              {formValues["is_second_tenant"]?.value === "true" && (
                <div className="pb-4">
                  <p>TENANT: __________________________</p>
                  <p>{renderDocumentField(formValues["second_tenant_name"]?.value)}</p>
                </div>
              )}
              {formValues["is_third_tenant"]?.value === "true" && (
                <div className="pb-4">
                  <p>TENANT: __________________________</p>
                  <p>{renderDocumentField(formValues["third_tenant_name"]?.value)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const renderDocumentField = (value: string) => {
  if (value) {
    return value;
  } else {
    return (
      <span
        style={{ verticalAlign: "bottom" }}
        className="bg-gray-200 h-4 inline-block w-20 align-bottom pb-0 mb-0"
      ></span>
    );
  }
};
