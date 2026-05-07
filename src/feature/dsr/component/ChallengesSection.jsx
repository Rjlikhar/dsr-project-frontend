import Section from "@/components/common/Section";
import Field from "@/components/common/Field";

export default function ChallengesSection({ data, setData }) {
  return (
    <Section title="Challenges">
      <Field label="Challenges">
        <textarea
          value={data.challenges}
          onChange={(e) =>
            setData((p) => ({ ...p, challenges: e.target.value }))
          }
        />
      </Field>
    </Section>
  );
}
